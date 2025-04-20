const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // Biblioteca para gerar senha aleatória

// Função para gerar uma senha aleatória
function gerarSenhaAleatoria(tamanho = 12) {
  return crypto.randomBytes(tamanho).toString("hex").slice(0, tamanho);
}

exports.register = async (req, res) => {
  try {
    const { nome, email, sexo } = req.body;

    // Verifica se o email já está cadastrado
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ erro: "Email já cadastrado." });
    }

    // Gera uma senha aleatória para o usuário
    const senhaGerada = gerarSenhaAleatoria();

    // Cria a senha criptografada
    const senhaCriptografada = await bcrypt.hash(senhaGerada, 10);

    // Cria o novo usuário
    const user = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
      sexo,
      peso: 0,
      altura: 0,
      idade: 0,
    });

    // Cria o token JWT com o id do usuário
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Aqui você pode adicionar um processo de envio de e-mail com a senha ou retornar diretamente
    res.status(200).json({
      mensagem: "Usuário registrado com sucesso.",
      token,
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        sexo: user.sexo,
        peso: user.peso,
        altura: user.altura,
        idade: user.idade,
        senhaGerada, // Retorna a senha gerada para o cliente, caso necessário
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

    // Verifica a senha fornecida
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

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, sexo, peso, altura, idade, senha } = req.body;

    // Prepara os dados de atualização
    let updateData = { nome, email, sexo, peso, altura, idade };

    // Verifica se a senha foi fornecida e criptografa se necessário
    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      updateData.senha = senhaCriptografada;
    }

    // Atualiza o usuário no banco
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Retorna a resposta com os dados atualizados (sem incluir a senha)
    res.status(200).json({
      mensagem: "Usuário atualizado com sucesso.",
      usuario: {
        _id: updatedUser._id,
        nome: updatedUser.nome,
        email: updatedUser.email,
        sexo: updatedUser.sexo,
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

// Alterar senha (Esqueci minha senha)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ erro: "Usuário não encontrado." });
    }

    // Gera uma nova senha aleatória
    const novaSenha = gerarSenhaAleatoria();

    // Criptografa a nova senha
    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha no banco de dados
    user.senha = novaSenhaCriptografada;
    await user.save();

    // Aqui você pode adicionar um processo de envio de e-mail com a nova senha, como o Nodemailer
    // Por enquanto, vamos apenas retornar a nova senha para o cliente
    res.status(200).json({
      mensagem: "Senha alterada com sucesso.",
      novaSenha, // Retorna a nova senha gerada (no ambiente real, você enviaria por e-mail)
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao alterar a senha." });
  }
};

exports.addWorkout = async (req, res) => {};

exports.listWorkouts = async (req, res) => {};

exports.deleteWorkout = async (req, res) => {};

exports.updateWorkout = async (req, res) => {};
