import React, { useMemo } from 'react'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarginEngine from '../../../voltz-core/deployments/kovan/MarginEngine.json'

const marginEngineInterface = new utils.Interface(MarginEngine.abi)

export const useMarginEngine = (marginEngineAddress: string): Contract => {
  return useMemo(() => {
    return new Contract(marginEngineAddress, marginEngineInterface)
  }, [marginEngineAddress])
}
