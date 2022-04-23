import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarginEngine from '../../../voltz-core/deployments/kovan/MarginEngine.json'
import { useContractFunction } from '@usedapp/core'

const KovanMasterMarginEngine = '0x82ea0a9c578042154188d635d9c0e2e13ff6e846'
const marginEngineInterface = new utils.Interface(MarginEngine.abi)
const contract = new Contract(KovanMasterMarginEngine, marginEngineInterface)

export interface LiquidatePositionArgs {
  owner: string,
  fixedLow: number,
  fixedHigh: number
}

export const useLiquidationFunction = () => {
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
