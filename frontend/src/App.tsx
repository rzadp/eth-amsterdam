import { useEthers } from '@usedapp/core'
import React from 'react'
import { useLiquidationFunction } from './useLiquidationFunction'
import { useLiquidationThreshold } from './useLiquidationThreshold'
import { useTickSpacing } from './useTickSpacing';

// import {nearestUsableTick} from '../../v1-sdk/src/utils/nearestUsableTick'
import {fixedRateToClosestTick} from '../../v1-sdk/src/utils/priceTickConversions'
import {Price} from '../../v1-sdk/src/entities/fractions/price'

import {} from '@voltz-protocol/v1-sdk'

/**
   * The minimum tick that can be used on any pool.
   */
const MIN_TICK: number = -69100;
 /**
  * The maximum tick that can be used on any pool.
  */
const MAX_TICK: number = -MIN_TICK;

export function nearestUsableTick(tick: number, tickSpacing: number) {
  const rounded = Math.round(tick / tickSpacing) * tickSpacing
  if (rounded < MIN_TICK) return rounded + tickSpacing
  else if (rounded > MAX_TICK) return rounded - tickSpacing
  else return rounded
}

export function App() {
  const {send, state} = useLiquidationFunction()
  const {account, activateBrowserWallet} = useEthers()

  const tickSpacing = useTickSpacing()
  // console.log({tickSpacing})
  // return null

  const owner = '0x001996da673a3da72d9ab3cacd20bbc3fdd3653b'
  const fixedLow = -6960
  const fixedHigh = 0

  const fixedRatePriceLow = Price.fromNumber(fixedLow);
  const closestTickLow: number = fixedRateToClosestTick(fixedRatePriceLow);

  const fixedRatePriceHigh = Price.fromNumber(fixedHigh);
  const closestTickHigh: number = fixedRateToClosestTick(fixedRatePriceHigh);


  const threshold = useLiquidationThreshold({owner, tickLower: closestTickLow, tickUpper: closestTickHigh})
  if (threshold === undefined) return 'Loading...'
  if (threshold.error) throw threshold.error

  if (!account) return (
    <button onClick={activateBrowserWallet}>Connect Wallet</button>
  )

  return (<>
    <div>Hello World</div>
    {threshold.value && <div>Liquidation threshold: {threshold.value}</div>}
    <button onClick={() => {
      send({
        owner,
        fixedLow,
        fixedHigh
      })
    }}>Liquidate something</button>
    {state.status !== 'None' && state.status}
  </>)
}
