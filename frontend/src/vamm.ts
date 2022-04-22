import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import VAMM from '../../voltz-core/deployments/kovan/VAMM.json'

const KovanVAMM = '0x684726e3404287781968adbef01e06e9a3613e53'
const vammInterface = new utils.Interface(VAMM.abi)
export const vamm = new Contract(KovanVAMM, vammInterface)
