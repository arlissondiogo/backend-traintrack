const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const progressionRoutes = require("./routes/progressionRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/progression", progressionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
