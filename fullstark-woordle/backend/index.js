import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { highScoreModel } from "./src/models/highScoreModel.js";
import apiRouter from "./src/routes/api.js";
import pageRouter from "./src/routes/pages.js";
/* import {
  startGame,
  postGuesses,
  getGameById,
  postHighScore,
  getHighScores,
} from "./src/db.js"; */
import { startDb } from "./startDb.js";
export const app = express();

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

// middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static("../client/build"));

dotenv.config();

app.use(apiRouter);
app.use(pageRouter);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
startDb(MONGO_URI, PORT);
