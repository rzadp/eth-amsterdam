import { Config, DAppProvider, Kovan } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import { App } from './App'

const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: getDefaultProvider('kovan'),
  },
}

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/voltzprotocol/v1',
  cache: new InMemoryCache()
});

ReactDOM.render(
    <DAppProvider config={config}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </DAppProvider>,
  document.getElementById('root')
)
