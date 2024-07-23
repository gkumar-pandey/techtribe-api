import express from "express";
import v1Routes from "./v1/index.js";

const routes = express.Router();

routes.use("/", v1Routes);

export default routes;
