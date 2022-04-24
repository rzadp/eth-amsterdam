import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { NotificationWrapper } from './NotificationWrapper'
import { COLORS } from '../styles/colors'
import { Button } from './Button'
import { DismissButton } from './DismissButton'

export interface WarningNotificationProps {
  children: ReactNode,
  onAction?: () => void,
  buttonText: string,
  onDismiss: () => void,
}

export function WarningNotification ({ children, onAction, buttonText, onDismiss }: WarningNotificationProps) {
  return (
    <Notification>
      {children}
      {onAction && <ActionButton onClick={onAction} theme="light">{buttonText}</ActionButton>}
      <DismissButton onClick={onDismiss}>x</DismissButton>
    </Notification>
  )
}

const Notification = styled(NotificationWrapper)`
  background-color: ${COLORS.warning500};
`

const ActionButton = styled(Button)`
  margin-left: auto;
  margin-right: 10px;
  color: ${COLORS.warning500};
  border: 1px solid ${COLORS.warning400};
  
  &:focus {
    box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px ${COLORS.warning100};
  }
`
