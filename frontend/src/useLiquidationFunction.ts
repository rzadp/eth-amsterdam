import { useContractFunction } from '@usedapp/core'
import { useMarginEngine } from './marginEngine'

export interface LiquidatePositionArgs {
  owner: string,
  fixedLow: number,
  fixedHigh: number
}

export const useLiquidationFunction = (marginEngineAddress: string) => {
  const contract = useMarginEngine(marginEngineAddress)

  const { state, send } = useContractFunction(
    contract,
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
