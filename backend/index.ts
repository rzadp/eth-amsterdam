import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import EpnsSDK from "@epnsproject/backend-sdk-staging";
import {sendNotification} from "./notifications";
import {CHANNEL_PK} from "./config";

dotenv.config()

const app: Express = express()
const port = 8080
const epnsSdk = new EpnsSDK(CHANNEL_PK);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.get('/epns/send-example', async (req: Request, res: Response) => {
    const tx = await sendNotification(epnsSdk, {
        recipientAddress: "0x222232c882677d524C4C1DD3AcD477ED7938F9d5",
        notification: {
            title: "Duck Title",
            message: "Duck Message"
        },
        pushNotification: {
            title: "Push Duck Title",
            message: "Push DUck Message"
        },
    })
    res.send(tx)
})

app.get('/epns/send/:message', async (req: Request, res: Response) => {
  const title = "Margin Requirement Alert"
  const message = req.params.message
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
  })
  res.send(tx)
})

app.get('/epns/get-users', async (req: Request, res: Response) => {
    res.send(await epnsSdk.getSubscribedUsers())
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
