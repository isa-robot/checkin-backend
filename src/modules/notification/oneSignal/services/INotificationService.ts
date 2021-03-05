import ISendNotificationResponseDTO from "@notification/oneSignal/dtos/ISendNotificationResponseDTO";
import {ISendNotificationTypeDTO} from "@notification/oneSignal/dtos/ISendNotificationDTO";

export default interface INotificationService {
  createNotification(notificationType: ISendNotificationTypeDTO): Promise<ISendNotificationResponseDTO | undefined>;
}
