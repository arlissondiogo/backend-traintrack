const User = require("../models/User");
const Workout = require("../models/Workout");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

function gerarSenhaAleatoria(tamanho = 12) {
  return crypto.randomBytes(tamanho).toString("hex").slice(0, tamanho);
}

exports.register = async (req, res) => {
  try {
    const { nome, email } = req.body;

    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ erro: "Email já cadastrado." });
    }

    const senhaGerada = gerarSenhaAleatoria();

    const senhaCriptografada = await bcrypt.hash(senhaGerada, 10);

    const user = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
      peso: 0,
      altura: 0,
      idade: 0,
    });
    res.status(200).json({
      mensagem: "Usuário registrado com sucesso.",
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        peso: user.peso,
        altura: user.altura,
        idade: user.idade,
        senhaGerada,
      },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro no registro." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ erro: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ erro: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ erro: "Erro no login." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ mensagem: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, peso, altura, idade, senha } = req.body;

    let updateData = { nome, email, peso, altura, idade };

    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      updateData.senha = senhaCriptografada;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.status(200).json({
      mensagem: "Usuário atualizado com sucesso.",
      usuario: {
        _id: updatedUser._id,
        nome: updatedUser.nome,
        email: updatedUser.email,
        peso: updatedUser.peso,
        altura: updatedUser.altura,
        idade: updatedUser.idade,
        __v: updatedUser.__v,
      },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ erro: "Usuário não encontrado." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = Date.now() + 3600000; // 1 hora

    user.resetToken = token;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    const resetLink = `https://traintrack.com/reset-password?token=${token}`; //url do frontend precisa ser alterada

    await sendEmail(
      user.email,
      "Reset de Senha",
      `Clique no link: ${resetLink}`
    );

    res.status(200).json({ mensagem: "E-mail de recuperação enviado." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao processar o pedido." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, novaSenha } = req.body;

    const user = await User.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ erro: "Token inválido ou expirado." });
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    user.senha = senhaCriptografada;

    user.resetToken = undefined;
    user.tokenExpiration = undefined;

    await user.save();

    res.status(200).json({ mensagem: "Senha atualizada com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar a senha." });
  }
};

exports.addWorkout = async (req, res) => {
  try {
    const {
      nomeExercicio,
      series,
      repeticoes,
      carga,
      tempoDescanso,
      tempoExecucao,
    } = req.body;
    const userId = req.userId;
    const novoTreino = new Workout({
      user: userId,
      nomeExercicio,
      series,
      repeticoes,
      carga,
      tempoDescanso,
      tempoExecucao,
    });

    await novoTreino.save();

    res.status(201).json({
      mensagem: "Treino adicionado com sucesso.",
      treino: novoTreino,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar treino." });
  }
};

exports.listWorkouts = async (req, res) => {
  try {
    const userId = req.userId;

    const treinos = await Workout.find({ user: userId });
    res.status(200).json({ treinos });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar treinos." });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const treino = await Workout.findById(id);

    if (!treino) {
      return res.status(404).json({ erro: "Treino não encontrado." });
    }

    if (treino.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para deletar este treino." });
    }

    await Workout.findByIdAndDelete(id);
    res.status(200).json({ mensagem: "Treino deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar treino." });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nomeExercicio,
      series,
      repeticoes,
      carga,
      tempoDescanso,
      tempoExecucao,
    } = req.body;

    const treino = await Workout.findById(id);
    if (!treino) {
      return res.status(404).json({ erro: "Treino não encontrado." });
    }

    if (treino.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para atualizar este treino." });
    }

    treino.nomeExercicio = nomeExercicio || treino.nomeExercicio;
    treino.series = series || treino.series;
    treino.repeticoes = repeticoes || treino.repeticoes;
    treino.carga = carga || treino.carga;
    treino.tempoDescanso = tempoDescanso || treino.tempoDescanso;
    treino.tempoExecucao = tempoExecucao || treino.tempoExecucao;

    await treino.save();

    res
      .status(200)
      .json({ mensagem: "Treino atualizado com sucesso.", treino });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar treino." });
  }
};
