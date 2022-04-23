import React from 'react'
import { useEthers } from '@usedapp/core'
import { useLiquidationFunction, useLiquidationThreshold, usePositions } from './hooks'
import { useWallets } from './provider/WalletsProvider';

// EXAMPLE:
const owner = '0x0000007f0b0a5e509e1c56687110b171d483fdf1'
const fixedLow = -47100
const fixedHigh = -23040
const marginEngineAddress = '0xdcf2d0e379c29f67df42f6b720591ae66da48e3c'

export function Positions() {
  const { positions } = usePositions()
  const { send, state } = useLiquidationFunction(marginEngineAddress)
  const { account } = useEthers()

  const {
    activateBrowserWallet,
    activateWeb3AuthWallet,
    deactivateWallet
  } = useWallets();

  const threshold = useLiquidationThreshold({owner, tickLower: fixedLow, tickUpper: fixedHigh, marginEngineAddress})
  if (threshold === undefined) return <>'Loading...'</>
  if (threshold.error) throw threshold.error

  return (
    <div>
      {account
          ? <>
            <h3>Account: {account}</h3>
            <button onClick={deactivateWallet}>Disconnect Wallet</button>
            {threshold.value && <div>Example Liquidation threshold: {threshold.value?.toString()}</div>}
            <button onClick={() => {
              send({
                owner,
                fixedLow,
                fixedHigh
              })
            }}>
              Liquidate something
            </button>
            {state.status !== 'None' && state.status}
          </>
          : (<div>
            <button onClick={activateBrowserWallet}>Connect Metamask</button>
            <button onClick={activateWeb3AuthWallet}>Connect Web3Auth</button>
          </div>)
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
