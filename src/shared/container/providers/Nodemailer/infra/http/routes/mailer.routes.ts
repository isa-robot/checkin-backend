import { Router } from 'express'

import MailerController from '@shared/container/providers/Nodemailer/infra/http/controllers/MailerController'

const mailerRouter = Router()

mailerRouter.post('/createMail', MailerController.createOrUpdate)

export default mailerRouter
