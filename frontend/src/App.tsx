import { useEthers } from '@usedapp/core'
import React from 'react'
import { useLiquidationFunction } from './useLiquidationFunction'

export function App() {
  const {send, state} = useLiquidationFunction()
  const {account, activateBrowserWallet} = useEthers()

  if (!account) return (
    <button onClick={activateBrowserWallet}>Connect Wallet</button>
  )

  return (<>
    <div>Hello World</div>
    <button onClick={() => {
      send({
        owner: '0x0000000000000000000000000000000000000000',
        fixedLow: 1,
        fixedHigh: 2
      })
    }}>Liquidate something</button>
    {state.status !== 'None' && state.status}
  </>)
}
