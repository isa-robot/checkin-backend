import ISendSmsDTO from "../dtos/ISendSmsDTO";

export default interface ISmsProvider {
  sendSms({ msg, to }: ISendSmsDTO): Promise<any>;
}
