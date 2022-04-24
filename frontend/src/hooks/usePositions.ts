import { useMemo } from 'react'
import { BigNumber } from 'ethers'

import { useGetPositionsQuery } from '../generated/v1Graphql'
import { SUBGRAPH_URL, BACKEND_URL } from '../consts'

import { useRefetchOnNewBlock } from './useRefetchOnBlock'
import { useAsync } from './useAsync'

export interface Position {
  id: string,
  tickUpper: BigNumber,
  tickLower: BigNumber,
  margin: BigNumber,
  owner: string,
  marginEngineAddress: string,
  isRisky: boolean,
}

export function usePositions () {
  const { data, loading, refetch } = useGetPositionsQuery({
    context: { subgraph: SUBGRAPH_URL },
  })

  const topWatched = useTopWatched()

  const positions: Position[] = useMemo(() => {
    if (!data?.positions) return []

    return data.positions
      .filter((position) => !topWatched.find((p) => p.id === position.id))
      .map((position) => ({
        id: position.id,
        tickUpper: BigNumber.from(position.tickUpper.value),
        tickLower: BigNumber.from(position.tickLower.value),
        margin: BigNumber.from(position.margin),
        owner: position.owner.id,
        marginEngineAddress: position.amm.marginEngineAddress,
        isRisky: false,
      }))
  }, [data])

  useRefetchOnNewBlock(refetch)

  return { positions: topWatched.concat(positions), isLoading: loading }
}

function useTopWatched (): Position[] {
  const [topWatched] = useAsync(async () => {
    const response = await fetch(
      `${BACKEND_URL}/topWatched`,
      { headers: {
          'Content-Type': 'application/json'
        },
      }
    )

    return response.json()
  }, [])

  return topWatched
    ? topWatched.map(position => ({
      id: position.id,
      tickUpper: BigNumber.from(position.tickUpper),
      tickLower: BigNumber.from(position.tickLower),
      margin: BigNumber.from(position.margin),
      owner: position.owner,
      marginEngineAddress: position.marginEngineAddress,
      isRisky: true,
    }))
    : []
}
