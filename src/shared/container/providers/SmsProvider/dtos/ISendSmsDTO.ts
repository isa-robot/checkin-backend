interface IContactSms {
  phone: string;
}

export default interface ISendSmsDTO {
  to: IContactSms;
  msg: string;
}
