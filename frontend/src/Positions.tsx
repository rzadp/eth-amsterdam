import React from 'react'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'

import MetaMask from './images/metamask.png'
import Coinbase from './images/coinbase.png'
import WConnect from './images/walletConnect.png'
import W3auth from './images/web3auth.jpeg'

import { useLiquidationFunction, usePositions } from './hooks'
import { useWallets } from './provider/WalletsProvider';
import { Button, Position } from './components'

const marginEngineAddress = '0xdcf2d0e379c29f67df42f6b720591ae66da48e3c'

export function Positions() {
  const { positions } = usePositions()
  const { send, state } = useLiquidationFunction(marginEngineAddress)
  const { account, library } = useEthers()

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
            <ButtonsWrapper>
              {/* <Button onClick={async () => alert(await library?.getSigner().signMessage('Hello World'))}>Sign me</Button> */}
              <Button onClick={deactivateWallet}>Disconnect Wallet</Button>
            </ButtonsWrapper>
            {state.status !== 'None' && state.status}
          </>
          : (<>
            <CenteredHeader>Connect With:</CenteredHeader>
            <ButtonsWrapper>
              <Button onClick={activateBrowserWallet}><Img src={MetaMask} />&nbsp;Metamask</Button>
              <Button onClick={activateWeb3AuthWallet}><Img src={W3auth} />&nbsp;Web3Auth</Button>
              <Button onClick={activateWalletConnect}><Img src={WConnect} />&nbsp;WalletConnect</Button>
              <Button onClick={activateWalletLink}><Img src={Coinbase} />&nbsp;Coinbase Wallet</Button>
            </ButtonsWrapper>
            <br/>
          </>)
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

const Img = styled.img`
  width: 18px;
  height: 18px;
`

const CenteredHeader = styled.h2`
  text-align: center;
`

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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 20px;
`
