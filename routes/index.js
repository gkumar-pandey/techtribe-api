import express from "express";
import apiRoute from "./api/index.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).json("Server is running");
});

routes.use("/", apiRoute);

export default routes;
