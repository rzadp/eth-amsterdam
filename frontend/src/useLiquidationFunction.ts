import { useContractFunction } from '@usedapp/core'
import { masterEngine } from './masterEngine'
export interface LiquidatePositionArgs {
  owner: string,
  fixedLow: number,
  fixedHigh: number
}

export const useLiquidationFunction = () => {
  const { state, send } = useContractFunction(
    masterEngine,
    'liquidatePosition',
    { transactionName: 'liquidatePosition' }
  )

  return {
    state,
    send: ({owner, fixedLow, fixedHigh}: LiquidatePositionArgs) => {
      send(owner, fixedLow, fixedHigh)
    }
  }
}
