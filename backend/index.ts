import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getPositions } from "./src/getPositions";

dotenv.config();

const app: Express = express();
const port = 8080;

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

  const response = await getPositions();
  console.log(response);
});
