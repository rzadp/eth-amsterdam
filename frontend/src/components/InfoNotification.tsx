import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { NotificationWrapper } from './NotificationWrapper'
import { COLORS } from '../styles/colors'
import { Button } from './Button'
import { DismissButton } from './DismissButton'

export interface InfoNotificationProps {
  children: ReactNode,
  onDismiss: () => void,
}

export function InfoNotification ({ children, onDismiss }: InfoNotificationProps) {
  return (
    <Notification>
      {children}
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
