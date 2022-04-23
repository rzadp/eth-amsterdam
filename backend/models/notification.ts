export interface NotificationConfig {
    recipientAddress: string
    pushNotification: PushNotification
    notification: Notification
    callToActionURL?: string // TODO: make this not optional after figuring out what do to with it
    imageURL?: string
}

interface PushNotification {
    title: string
    message: string
}

interface Notification {
    title: string
    message: string
}