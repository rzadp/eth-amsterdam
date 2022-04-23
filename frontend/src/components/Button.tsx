import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'src/styles/colors'

export interface ButtonProps {
  theme?: 'light' | 'dark'
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  border: ${props => props.theme === 'light' ? `1px solid ${COLORS.primary400}` : 'none'};
  outline: none;
  background-color: ${props => props.theme === 'light' ? COLORS.white : COLORS.primary500};
  color: ${props => props.theme === 'light' ? COLORS.primary500 : COLORS.white};
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme === 'light' ? COLORS.primary100 :COLORS.primary400};
  }
  
  &:focus {
    background-color: ${props => props.theme === 'light' ? COLORS.white :COLORS.primary500};
    box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px ${COLORS.shadow};
  }
`
