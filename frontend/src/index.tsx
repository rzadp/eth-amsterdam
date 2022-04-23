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
import { SUBGRAPH_URL } from './consts'

const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: getDefaultProvider('kovan'),
  },
}

const client = new ApolloClient({
  uri: SUBGRAPH_URL,
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
