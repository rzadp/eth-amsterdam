import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getPositions } from "./src/getPositions";
import { PositionsStore } from "./src/PositionsStore";
// import EpnsSDK from "@epnsproject/backend-sdk-staging";
// import { sendNotification } from "./src/notifications";
// import { CHANNEL_PK } from "./config";

const UPDATE_INTERVAL = 5 * 60 * 1000;

dotenv.config();

const app: Express = express();
const port = 8080;

// const epnsSdk = new EpnsSDK(CHANNEL_PK);

const positionsStore = new PositionsStore();

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Dwa workery:
// -> updater: aktualizuje wszystkie pozycje co 5min
// -> closeWatcher: aktualizuje najbardziej zagrozone co 1min

// app.get("/epns/send-example", async (req: Request, res: Response) => {
//   const tx = await sendNotification(epnsSdk, {
//     recipientAddress: "0x222232c882677d524C4C1DD3AcD477ED7938F9d5",
//     notification: {
//       title: "Duck Title",
//       message: "Duck Message",
//     },
//     pushNotification: {
//       title: "Push Duck Title",
//       message: "Push DUck Message",
//     },
//   });
//   res.send(tx);
// });

// app.get("/epns/get-users", async (req: Request, res: Response) => {
//   res.send(await epnsSdk.getSubscribedUsers());
// });

app.get("/topWatched", async (req: Request, res: Response) => {
  res.send(positionsStore.getTopWatched());
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

  getPositions(positionsStore);

  setInterval(getPositions, UPDATE_INTERVAL, positionsStore);
});
