import React from 'react'
import { useEthers } from '@usedapp/core'
import { useLiquidationFunction } from './hooks/useLiquidationFunction'
import { useLiquidationThreshold } from './hooks/useLiquidationThreshold'
import { usePositions } from './hooks/usePositions'

// EXAMPLE:
const owner = '0x0000007f0b0a5e509e1c56687110b171d483fdf1'
const fixedLow = -47100
const fixedHigh = -23040
const marginEngineAddress = '0xdcf2d0e379c29f67df42f6b720591ae66da48e3c'

export function App() {
  const { positions } = usePositions()
  const {account, activateBrowserWallet} = useEthers()
  const {send, state} = useLiquidationFunction(marginEngineAddress)

  const threshold = useLiquidationThreshold({owner, tickLower: fixedLow, tickUpper: fixedHigh, marginEngineAddress})
  if (threshold === undefined) return 'Loading...'
  if (threshold.error) throw threshold.error

  return (
    <div>
      {account
        ? <>
          <button onClick={() => {
            send({
              owner,
              fixedLow,
              fixedHigh
            })
          }}>Liquidate example</button>
          {state.status !== 'None' && state.status}
        </>
        : <button onClick={activateBrowserWallet}>Connect Wallet</button>
      }

      {threshold.value && <div>Example Liquidation threshold: {threshold.value?.toString()}</div>}
      
      {positions.map((position) => (
        <div key={position.id}>
          <div>{position.id}</div>
          <div>{position.margin}</div>
        </div>
      ))}
    </div>
  )
}
