import express from "express";
import session from "express-session";
import cors from "cors";

import auth_route from "./routes/auth_route.js";

import db from "./db/db.js";

import "dotenv/config"; // This loads the .env file

const app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    rolling: true,
    cookie: {
      expires: 60 * 60 * 24,
      secure: process.env.ENVIRONMENT !== "development",
      sameSite: "lax",
    },
  })
);

app.use(
  cors({
    origin: [process.env.LOCALHOST_CLIENT_URL, process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(auth_route);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

export default app;
