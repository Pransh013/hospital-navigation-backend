import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
