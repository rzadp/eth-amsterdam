import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { NotificationWrapper } from './NotificationWrapper'
import { COLORS } from 'src/styles/colors'
import { Button } from './Button'
import { DismissButton } from './DismissButton'

export interface InfoNotificationProps {
  children: ReactNode,
  onAction?: () => void,
  buttonText: string,
  onDismiss: () => void,
}

export function InfoNotification ({ children, onAction, buttonText, onDismiss }: InfoNotificationProps) {
  return (
    <Notification>
      {children}
      {onAction && <ActionButton onClick={onAction} theme="light">{buttonText}</ActionButton>}
      <DismissButton onClick={onDismiss}>x</DismissButton>
    </Notification>
  )
}

const Notification = styled(NotificationWrapper)`
  background-color: ${COLORS.primary500};
`

const ActionButton = styled(Button)`
  margin-left: auto;
  margin-right: 10px;
`
