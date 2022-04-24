import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getPositions } from "./src/getPositions";
import { PositionsStore } from "./src/PositionsStore";
import EpnsSDK from "@epnsproject/backend-sdk-staging";
import { sendNotification } from "./src/notifications";
import { CHANNEL_PK } from "./config";
import { create } from 'ipfs-http-client'
import { generate } from 'text-to-image'
import cors from 'cors'

const ipfs = create({url: 'http://localhost:5001/api/v0'})
const UPDATE_INTERVAL = 5 * 60 * 1000;

dotenv.config();

const app: Express = express();
app.use(cors());
const port = 8081;

const epnsSdk = new EpnsSDK(CHANNEL_PK);

const notify = async (message: string, imgText: string) => {
  const title = "Margin Requirement Alert"
  const img = await generate(imgText, { maxWidth: 100, fontSize: 15 })
  const { cid } = await ipfs.add(img)
  const tx = await sendNotification(epnsSdk, {
      recipientAddress: "0x222232c882677d524C4C1DD3AcD477ED7938F9d5",
      notification: {
          title,
          message
      },
      pushNotification: {
          title,
          message
      },
      imageURL: cid.toString()
  })
  return tx
}

const positionsStore = new PositionsStore(notify);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/epns/send/:message', async (req: Request, res: Response) => {
  const message = req.params.message
  res.send(await notify(message, 'image'))
})

app.get("/epns/get-users", async (req: Request, res: Response) => {
  res.send(await epnsSdk.getSubscribedUsers());
});

app.get("/topWatched", async (req: Request, res: Response) => {
  res.send(positionsStore.getTopWatched());
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

  await getPositions(positionsStore);

  setInterval(getPositions, UPDATE_INTERVAL, positionsStore);
});
