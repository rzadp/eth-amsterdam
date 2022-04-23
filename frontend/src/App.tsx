import {
  useEtherBalance
} from '@usedapp/core'
import { utils } from 'ethers'
import React from 'react'

import { usePositions } from './hooks/usePositions'

export function App() {
  const { positions } = usePositions()
  return (
    <div>
      {positions.map((position) => (
        <div key={position.id}>
          <div>{position.id}</div>
          <div>{position.margin}</div>
        </div>
      ))}
    </div>
  )
}
