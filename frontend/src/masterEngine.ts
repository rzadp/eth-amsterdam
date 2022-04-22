import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import MarginEngine from '../../voltz-core/deployments/kovan/MarginEngine.json'

const KovanMasterMarginEngine = '0x82ea0a9c578042154188d635d9c0e2e13ff6e846'
const marginEngineInterface = new utils.Interface(MarginEngine.abi)
export const masterEngine = new Contract(KovanMasterMarginEngine, marginEngineInterface)
