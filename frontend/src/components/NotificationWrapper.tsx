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
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0px 4px 5px -1px rgba(0, 0, 0, 0.1);
`
