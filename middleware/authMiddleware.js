const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.userId = decoded.id; // Coloca o userId no req
    next(); // Continua o fluxo para a próxima função
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;
