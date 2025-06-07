const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ erro: "Email já cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

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
        senha,
      },
    });
  } catch (error) {
    console.error(error);
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

const Workout = require("../models/Workout");

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await Workout.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    res.status(200).json({ mensagem: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select(
      "-senha -resetToken -tokenExpiration"
    );

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.status(200).json({
      usuario: {
        _id: user._id,
        nome: user.nome,
        email: user.email,
        peso: user.peso,
        altura: user.altura,
        idade: user.idade,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuário." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { nome, email, peso, altura, idade, senha } = req.body;

    console.log("Dados recebidos:", { nome, email, peso, altura, idade });
    console.log("UserId:", userId);

    let updateData = {};

    if (nome !== undefined) updateData.nome = nome;
    if (email !== undefined) updateData.email = email;
    if (peso !== undefined) updateData.peso = peso;
    if (altura !== undefined) updateData.altura = altura;
    if (idade !== undefined) updateData.idade = idade;

    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      updateData.senha = senhaCriptografada;
    }

    console.log("Dados para atualizar:", updateData);

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
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
      },
    });
  } catch (error) {
    console.error("Erro no updateUser:", error);
    res
      .status(500)
      .json({ erro: "Erro ao atualizar usuário.", detalhes: error.message });
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
    const tokenExpiration = Date.now() + 3600000;

    user.resetToken = token;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    const resetLink = `https://frontend-traintrack.vercel.app/reset-password?token=${token}`;

    await sendEmail(
      user.email,
      "Reset de Senha",
      `Olá ${user.nome},\n\n` +
        `Você solicitou a redefinição de sua senha. Se não foi você, ignore este e-mail.\n\n` +
        `Clique no link para redefinir sua senha: ${resetLink}`
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
