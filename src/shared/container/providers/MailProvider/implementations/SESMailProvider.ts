import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { injectable, inject } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import mailConfig from '@config/mail';

@injectable()
export default class SESMailProvider implements IMailProvider {
    client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                region: 'us-east-1',
            }),
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        await this.client.sendMail({
            from: {
                name: from?.name || mailConfig.defaults.from.name,
                address: from?.address || mailConfig.defaults.from.address,
            },
            to,
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}
