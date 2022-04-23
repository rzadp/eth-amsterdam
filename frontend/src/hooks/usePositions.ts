import { useMemo } from 'react'

import { useGetPositionsQuery } from '../generated/v1Graphql'
import { useRefetchOnNewBlock } from './useRefetchOnBlock'

export function usePositions () {
  const { data, loading, refetch } = useGetPositionsQuery({
    context: { subgraph: 'https://api.thegraph.com/subgraphs/name/voltzprotocol/v1' },
  })

  const positions = useMemo(() => {
    if (!data?.positions) return []
    return data.positions
  }, [data])

  useRefetchOnNewBlock(refetch)

  return { positions: positions, isLoading: loading }
}
