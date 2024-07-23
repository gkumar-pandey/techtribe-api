import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDb from "./config/config.js";
import routes from "./routes/index.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());

connectDb();

app.use("/", routes);

const PORT = 6969 | process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running at PORT:${PORT}`);
});
