import { useMemo } from 'react'

import { useGetPositionsQuery } from '../generated/v1Graphql'
import { SUBGRAPH_URL } from '../consts'

import { useRefetchOnNewBlock } from './useRefetchOnBlock'

export function usePositions () {
  const { data, loading, refetch } = useGetPositionsQuery({
    context: { subgraph: SUBGRAPH_URL },
  })

  const positions = useMemo(() => {
    if (!data?.positions) return []
    return data.positions
  }, [data])

  useRefetchOnNewBlock(refetch)

  return { positions: positions, isLoading: loading }
}
