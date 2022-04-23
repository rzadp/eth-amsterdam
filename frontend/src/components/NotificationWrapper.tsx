import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'src/styles/colors'

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  color: ${COLORS.white};
  border-radius: 8px;
`
