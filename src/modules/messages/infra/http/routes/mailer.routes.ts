import { Router } from 'express'

import KeycloakConnect from '@shared/keycloak/keycloak-config'
import MailerController from '@messages/infra/http/controllers/MailerController'

const mailerRouter = Router()
const keycloak = KeycloakConnect.getKeycloak()

mailerRouter.post('/createMail', keycloak.protect("realm:admin"),MailerController.createOrUpdate)
mailerRouter.get('/', keycloak.protect("realm:admin"),MailerController.getMail)

export default mailerRouter
