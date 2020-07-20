import { Router } from 'express'

import KeycloakConfig from '@shared/keycloak/keycloak-config'
import MailerController from '@shared/container/providers/MailsProvider/infra/http/controllers/MailerController'

const mailerRouter = Router()
const keycloak = KeycloakConfig.getKeycloak()

mailerRouter.post('/createMail', keycloak.protect("realm:admin"),MailerController.createOrUpdate)
mailerRouter.get('/', keycloak.protect("realm:admin"),MailerController.getMail)
export default mailerRouter
