import React from 'react'
import styled from 'styled-components'
import { useNotifications } from './hooks/useNotifications'
import { InfoNotification } from './components'

const epnsWalletAddress = "0x222232c882677d524C4C1DD3AcD477ED7938F9d5"; // Example address with notification

export function Notifications() {
  const notifications = useNotifications(epnsWalletAddress) // TODO replace walletAddress with account

  return (
    <NotificationWrapper>
      {
        notifications.map(notification => (
          <InfoNotification
            key={notification.sid}
            onDismiss={notification.onClick}
            onAction={notification.onClick}
            buttonText="Dismiss"
          >
            <NotificationText>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationBody>{notification.message}</NotificationBody>
            </NotificationText>
          </InfoNotification>
        ))
      }
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`

const NotificationText = styled.div`
  flex-direction: column;
`

const NotificationTitle = styled.p`
  margin: 0 0 5px 0;
`

const NotificationBody = styled.p`
  font-weight: normal;
  margin: 0;
`
