import {AxiosAdapter, AxiosPromise, AxiosRequestConfig} from "axios";
import notificationAxios from "@notification/oneSignal/client/notificationAxios";
import INotificationService from "@notification/oneSignal/services/INotificationService";
import ISendNotificationResponseDTO from "@notification/oneSignal/dtos/ISendNotificationResponseDTO";
import Notification from "@notification/oneSignal/models/Notification";
import {ISendNotificationTypeDTO} from "@notification/oneSignal/dtos/ISendNotificationDTO";
import {ENotificationType} from "@notification/enums/ENotificationType";

class NotificationService implements INotificationService{

  async createNotification(sendNotificationType: ISendNotificationTypeDTO): Promise<ISendNotificationResponseDTO | undefined> {
    try{
      if (sendNotificationType.notificationType == ENotificationType.assisted) {
        const create = await this._createAssisted(sendNotificationType.userId);
        return Promise.resolve(create);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async _createAssisted(userId: string) {
    try {
      const notification = new Notification({
        app_id: process.env.NOTIFICATION_APP_ID,
        include_external_user_ids: [userId],
        template_id: process.env.NOTIFICATION_ASSESSMENTS_TEMPLATE_ID});
      const create = await notificationAxios.post("/notifications", notification);
      return create.data as ISendNotificationResponseDTO;
    } catch (e) {
      throw e;
    }
  }
}

export default new NotificationService();
