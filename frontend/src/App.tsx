import {
  useEtherBalance
} from '@usedapp/core'
import { KovanMasterMarginEngine } from 'eth-amsterdam-common'
import { utils } from 'ethers'
import React from 'react'

export function App() {
  const etherBalance = useEtherBalance(KovanMasterMarginEngine)
  return (
    <div>MasterMarginEngine ETH balance: {etherBalance ? utils.formatEther(etherBalance) : 'Loading...'}</div>
  )
}
