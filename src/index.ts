import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import morgan from "morgan";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.get("/", (_: Request, res: Response) => {
  res.json({ msg: "Hello world" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
