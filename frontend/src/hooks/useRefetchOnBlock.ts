import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { useBlockNumber } from '@usedapp/core'
import { useEffect } from 'react'

export function useRefetchOnNewBlock<Query>(
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<Query>>
) {
  const blockNumber = useBlockNumber()
  useEffect(() => {
    refetch()
  }, [blockNumber, refetch])
}
