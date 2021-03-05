import { ISendNotificationDTO } from "@notification/oneSignal/dtos/ISendNotificationDTO";

export default class Notification {
  app_id: any;
  include_external_user_ids: string[];
  template_id: any;

  constructor(notification: ISendNotificationDTO) {
    this.app_id = notification.app_id;
    this.include_external_user_ids = notification.include_external_user_ids;
    this.template_id = notification.template_id;
  }
}
