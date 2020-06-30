import nodemailer, { Transporter } from "nodemailer";

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import { injectable, inject } from "tsyringe";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import mailConfig from "@config/mail";

@injectable()
export default class EtheralMailProvider implements IMailProvider {
  client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.address || mailConfig.defaults.from.name,
        address: from?.address || mailConfig.defaults.from.address,
      },
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
