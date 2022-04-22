import { Config, DAppProvider, Kovan } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: getDefaultProvider('kovan'),
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)
