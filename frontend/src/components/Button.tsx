import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'src/styles/colors'

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: ${COLORS.primary500};
  color: ${COLORS.white};

  &:hover {
    background-color: ${COLORS.primary400};
  }
  
  &:focus {
    background-color: ${COLORS.primary500};
    box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px ${COLORS.shadow};
  }
`
