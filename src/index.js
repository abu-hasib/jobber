import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("mail@mail.com"),
  };
  next();
});
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/jobs", routes.job);
app.use("/profile", routes.profile);

app.get("*", function (req, res, next) {
  console.log("wildcarding...");
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  console.log("erroringg...");
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect("/users");
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
