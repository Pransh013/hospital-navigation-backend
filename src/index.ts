import express, { Request, Response } from "express";
import { env } from "./config/env";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const PORT = env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
