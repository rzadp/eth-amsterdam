import { Call, useCall } from "@usedapp/core";
import { useMarginEngine } from "./useMarginEngine";
import { BigNumber } from 'ethers'

export interface useLiquidationThresholdProps {
  marginEngineAddress: string
  owner: string,
  tickLower: BigNumber,
  tickUpper: BigNumber,
}

export const useLiquidationThreshold = ({owner, tickLower, tickUpper, marginEngineAddress}: useLiquidationThresholdProps) => {
  const contract = useMarginEngine(marginEngineAddress)
  const call: Call = {
    contract,
    method: 'getPositionMarginRequirement',
    args: [
      owner,
      tickLower,
      tickUpper,
      false // _isLM
    ]
  }

  return useCall(call)
}
