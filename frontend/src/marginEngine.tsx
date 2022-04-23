import React, { useMemo } from 'react'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarginEngine from '../../voltz-core/deployments/kovan/MarginEngine.json'

// const KovanMasterMarginEngine = '0xdcf2d0e379c29f67df42f6b720591ae66da48e3c'

const marginEngineInterface = new utils.Interface(MarginEngine.abi)

export const useMarginEngine = (marginEngineAddress: string | undefined): Contract | undefined => {
  return useMemo(() => {
    if (marginEngineAddress === undefined) return undefined
    return new Contract(marginEngineAddress, marginEngineInterface)
  }, [marginEngineAddress])
}
