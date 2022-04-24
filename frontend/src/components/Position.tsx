import React from 'react'
import styled from 'styled-components'

import { Position, useLiquidationThreshold } from '../hooks'
import { COLORS } from '../styles/colors'

export interface PositionProps {
  position: Position,
}

// margin - threshold = margin buffer
// margin buffer < 0   ===>  can liquidate
// margin buffer small ===> warning, red alert

export function Position ({ position }: PositionProps) {
  const threshold = useLiquidationThreshold({
    owner: position.owner,
    tickLower: position.tickLower,
    tickUpper: position.tickUpper,
    marginEngineAddress: position.marginEngineAddress,
  })

  const marginBuffer = threshold && position.margin.sub(threshold.value.toString())

  return (
    <>
      <Address>{shortenAddress(position.owner)}</Address>
      <TableElement>{position.tickLower.toString()}</TableElement>
      <TableElement>{position.tickUpper.toString()}</TableElement>
      <TableElement>{position.margin.toString()}</TableElement>
      <TableElement>{threshold?.value.toString() || <div />}</TableElement>
      <RowLastElement>{marginBuffer?.toString() || <div />}</RowLastElement>
    </>
  )
}

function shortenAddress (address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const TableElement = styled.div`
  background-color: ${COLORS.gray100};
  margin-bottom: 2px;
  padding: 10px 0;
  font-weight: bold;
  font-size: 0.9em;
`

const Address = styled(TableElement)`
  color: ${COLORS.gray900};
  font-size: 0.8em;
  font-weight: normal;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  padding-left: 5px;
`

const RowLastElement = styled(TableElement)`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`
