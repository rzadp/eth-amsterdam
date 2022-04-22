import { useEthers } from '@usedapp/core'
import React from 'react'
import { useLiquidationFunction } from './useLiquidationFunction'
import { useLiquidationThreshold } from './useLiquidationThreshold'

export function App() {
  const {send, state} = useLiquidationFunction()
  const {account, activateBrowserWallet} = useEthers()

  const owner = '0x001fa6f74c8eeaa372c8437a3bdd22b630d9a7b6'
  const fixedLow = -20820
  const fixedHigh = -10980

  const threshold = useLiquidationThreshold({owner, fixedLow, fixedHigh})
  if (threshold === undefined) return 'Loading...'
  if (threshold.error) throw threshold.error

  if (!account) return (
    <button onClick={activateBrowserWallet}>Connect Wallet</button>
  )

  return (<>
    <div>Hello World</div>
    {threshold.value && <div>Liquidation threshold: {threshold.value}</div>}
    <button onClick={() => {
      send({
        owner,
        fixedLow,
        fixedHigh
      })
    }}>Liquidate something</button>
    {state.status !== 'None' && state.status}
  </>)
}
