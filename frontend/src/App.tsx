import { useEthers } from '@usedapp/core'
import React from 'react'
import { useLiquidationFunction } from './useLiquidationFunction'

import { usePositions } from './hooks/usePositions'

export function App() {
  const { positions } = usePositions()
  const {send, state} = useLiquidationFunction()
  const {account, activateBrowserWallet} = useEthers()

  return (
    <div>
      {account
        ? <>
          <button onClick={() => {
            send({
              owner: '0x0000000000000000000000000000000000000000',
              fixedLow: 1,
              fixedHigh: 2
            })
          }}>
            Liquidate something
          </button>
          {state.status !== 'None' && state.status}
        </>
        : <button onClick={activateBrowserWallet}>Connect Wallet</button>
      }
      {positions.map((position) => (
        <div key={position.id}>
          <div>{position.id}</div>
          <div>{position.margin}</div>
        </div>
      ))}
    </div>
  )
}
