import { Call, useCall } from "@usedapp/core";
import { useMarginEngine } from "./useMarginEngine";

export interface useLiquidationThresholdProps {
  marginEngineAddress: string
  owner: string,
  tickLower: number,
  tickUpper: number
}

export const useLiquidationThreshold = ({owner, tickLower, tickUpper, marginEngineAddress}: useLiquidationThresholdProps) => {
  const contract = useMarginEngine(marginEngineAddress)
  const call: Call | undefined = contract && {
    contract,
    method: 'getPositionMarginRequirement',
    args: [
      owner, tickLower, tickUpper,
      false // _isLM
    ]
  }

  return useCall(call)
}
