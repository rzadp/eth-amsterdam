import { Call, useCall } from "@usedapp/core";
import { masterEngine } from "./masterEngine";

export interface useLiquidationThresholdProps {
  owner: string,
  tickLower: number,
  tickUpper: number
}

export const useLiquidationThreshold = ({owner, tickLower, tickUpper}: useLiquidationThresholdProps) => {
  const call: Call = {
    contract: masterEngine,
    method: 'getPositionMarginRequirement',
    args: [
      owner, tickLower, tickUpper,
      false // _isLM
    ]
  }

  return useCall(call)
}
