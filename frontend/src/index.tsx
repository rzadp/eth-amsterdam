import React from 'react'
import { Config, DAppProvider, Kovan } from '@usedapp/core'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import { App } from './App'
import { SUBGRAPH_URL } from './consts'
import {WalletsProvider} from "./provider/WalletsProvider";

const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: 'https://kovan.infura.io/v3/007740c0a57f4c7199135b074abf0e07',
  },
}

const client = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache()
});

ReactDOM.render(
    <DAppProvider config={config}>
      <ApolloProvider client={client}>
          <WalletsProvider>
            <App />
          </WalletsProvider>
      </ApolloProvider>
    </DAppProvider>,
  document.getElementById('root')
)
