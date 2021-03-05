import {ENotificationType} from "@notification/enums/ENotificationType";

export interface ISendNotificationDTO {
  app_id: any;
  include_external_user_ids: string[];
  template_id: any;
}

export interface ISendNotificationTypeDTO {
  userId: string,
  notificationType: ENotificationType
}
