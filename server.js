const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const progressaoRoutes = require("./routes/progressaoRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/progressao", progressaoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
