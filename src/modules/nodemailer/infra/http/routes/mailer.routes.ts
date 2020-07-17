import { Router } from 'express'

import MailerController from '@nodemailer/infra/http/controllers/MailerController'
import getMailerConfig from "@nodemailer/services/getMailerConfig";

const mailerRouter = Router()

mailerRouter.post('/createMail', MailerController.createOrUpdate)

export default mailerRouter
