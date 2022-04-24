import React from 'react'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'

import { useLiquidationFunction, usePositions } from './hooks'
import { useWallets } from './provider/WalletsProvider';
import { Button, Position } from './components'

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
    activateWalletLink,
    activateWalletConnect,
    activateWeb3AuthWallet,
    deactivateWallet
  } = useWallets();

  return (
    <div>
      {account
          ? <>
            <h3>Account: {account}</h3>
            <button onClick={deactivateWallet}>Disconnect Wallet</button>
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
            <Button onClick={activateBrowserWallet}>Connect Metamask</Button>
            <Button onClick={activateWeb3AuthWallet}>Connect Web3Auth</Button>
            <Button onClick={activateWalletConnect}>Connect WalletConnect</Button>
            <Button onClick={activateWalletLink}>Connect Coinbase Wallet</Button>
          </div>)
      }
      <PositionsTable>
        <TableHeaderItem>Owner</TableHeaderItem>
        <TableHeaderItem>Lower tick / Upper tick</TableHeaderItem>
        <TableHeaderItem>Margin</TableHeaderItem>
        <TableHeaderItem>Threshold</TableHeaderItem>
        <TableHeaderItem>Margin buffer</TableHeaderItem>
        <TableHeaderItem />

      {positions.map((position) => (
        <Position key={position.id} position={position}/>
      ))}
      </PositionsTable>
    </div>
  )
}

const PositionsTable = styled.div`
  margin: 10px 20px 80px;
  width: calc(100% - 40px);
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
   row-gap: 20px;
`

const TableHeaderItem = styled.div`
  font-weight: normal;
  text-align: left;
`
