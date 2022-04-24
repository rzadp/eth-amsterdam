import React, { useEffect, useState } from "react"
import { create } from 'ipfs-http-client'
const Buffer = require('buffer/').Buffer // Node Buffer polyfill.

const ipfs = create({url: 'http://localhost:5001/api/v0'})
const startString = 'data:image/png;'

export const IPFSImage = ({cid}: {cid: string}) => {
  const [img, setImg] = useState<string | undefined>(undefined)

  useEffect(() => {
    (async () => {
      const result = await ipfs.get(cid)
      for await (const dataArray of result) {
        const data = Buffer.from(dataArray).toString()
        const baseImg = data.substring(data.indexOf(startString))
        setImg(baseImg)
      }
    })()
  }, [cid])

  return img ? <img src={img} /> : <></>
}
