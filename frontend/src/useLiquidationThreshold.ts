import { Call, useCall } from "@usedapp/core";
import { masterEngine } from "./masterEngine";

export interface useLiquidationThresholdProps {
  owner: string,
  fixedLow: number,
  fixedHigh: number
}

export const useLiquidationThreshold = ({owner, fixedLow, fixedHigh}: useLiquidationThresholdProps) => {
  const call: Call = {
    contract: masterEngine,
    method: 'getPositionMarginRequirement',
    args: [
      owner, fixedLow, fixedHigh,
      false // _isLM
    ]
  }

  return useCall(call)
}
