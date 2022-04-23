import { api, utils } from "@epnsproject/frontend-sdk-staging";
import { useEffect, useState } from "react";

const readSeen = () => JSON.parse(localStorage.getItem('epns-seen') ?? '[]')

export function useNotifications(walletAddress: string) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [seen, setSeen] = useState<any[]>(readSeen)

  const fetchNotifications = async () => {
    const { results } = await api.fetchNotifications(walletAddress)
    const parsedNotifications = utils.parseApiResponse(results);

    setNotifications(parsedNotifications.map(notification => {
      const onClick = () => {
        setSeen(oldSeen => {
          const newSeen = [...oldSeen, notification.sid]
          localStorage.setItem('epns-seen', JSON.stringify(newSeen))
          return newSeen
        })
      }
      return {...notification, onClick}
    }))
  }

  useEffect(() => {
    fetchNotifications().catch(console.error)
    const intervalId = setInterval(fetchNotifications, 2000)
    return () => clearInterval(intervalId)
  }, [walletAddress])

  return notifications.filter(notification => !seen.includes(notification.sid))
}
