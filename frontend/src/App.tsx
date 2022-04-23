import {
  useEtherBalance
} from '@usedapp/core'
import { utils } from 'ethers'
import React from 'react'

import { usePositions } from './hooks/usePositions'

export function App() {
  const { positions, isLoading } = usePositions()
  console.log(positions)
  return (
    <div>Hello World</div>
  )
}
