import { useMemo } from 'react'
import { BigNumber } from 'ethers'

import { useGetPositionsQuery } from '../generated/v1Graphql'
import { SUBGRAPH_URL } from '../consts'

import { useRefetchOnNewBlock } from './useRefetchOnBlock'

export interface Position {
  id: string,
  tickUpper: BigNumber,
  tickLower: BigNumber,
  margin: BigNumber,
  owner: string,
  marginEngineAddress: string,
}

export function usePositions () {
  const { data, loading, refetch } = useGetPositionsQuery({
    context: { subgraph: SUBGRAPH_URL },
  })

  const positions: Position[] = useMemo(() => {
    if (!data?.positions) return []

    return data.positions.map((position) => ({
      id: position.id,
      tickUpper: BigNumber.from(position.tickUpper.value),
      tickLower: BigNumber.from(position.tickLower.value),
      margin: BigNumber.from(position.margin),
      owner: position.owner.id,
      marginEngineAddress: position.amm.marginEngineAddress,
    }))
  }, [data])

  useRefetchOnNewBlock(refetch)

  return { positions: positions, isLoading: loading }
}
