import NotificationHelper from "@epnsproject/backend-sdk-staging";
import { NotificationConfig } from "../models/notification";

export function sendNotification(
  sdk: NotificationHelper,
  notificationConfig: NotificationConfig
): Promise<any> {
  return sdk.sendNotification(
    notificationConfig.recipientAddress,
    notificationConfig.pushNotification.title,
    notificationConfig.pushNotification.message,
    notificationConfig.notification.title,
    notificationConfig.notification.message,
    3,
    notificationConfig.callToActionURL, // an url for users to be redirected to
    notificationConfig.imageURL, // an image url, or an empty string
    null // leave as null
  );
}
