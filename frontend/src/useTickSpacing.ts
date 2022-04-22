import { Call, useCall } from "@usedapp/core";
import { vamm } from "./vamm";

export const useTickSpacing = () => {
  const call: Call = {
    contract: vamm,
    method: 'tickSpacing',
    args: []
  }

  return useCall(call)
}
