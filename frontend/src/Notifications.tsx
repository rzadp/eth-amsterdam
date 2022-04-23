import React from 'react'
import { NotificationItem } from "@epnsproject/frontend-sdk-staging"
import { useNotifications } from "./hooks/useNotifications"

const epnsWalletAddress = "0x222232c882677d524C4C1DD3AcD477ED7938F9d5"; // Example address with notification

export function Notifications() {
  const notifications = useNotifications(epnsWalletAddress) // TODO replace walletAddress with account

  return (
    <div>
      {
        notifications.map(notification => (
          <div key={notification.sid}>
            {notification.onClick && <button onClick={notification.onClick}>Dismiss</button>}
            <NotificationItem
                notificationTitle={notification.title}
                notificationBody={notification.message}
                // app={notification.app}
                // icon={notification.icon}
                // image={notification.image}
                // url={notification.url}
            />
          </div>
        ))
      }
    </div>
  )
}
