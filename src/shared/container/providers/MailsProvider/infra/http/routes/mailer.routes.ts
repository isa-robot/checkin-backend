import { Router } from 'express'

import KeycloakConfig from '@shared/keycloak/keycloak-config'
import MailerController from '@shared/container/providers/MailsProvider/infra/http/controllers/MailerController'
import MailerDestinatariesController
  from "@shared/container/providers/MailsProvider/infra/http/controllers/MailerDestinatariesController";

const mailerRouter = Router()
const keycloak = KeycloakConfig.getKeycloak()

mailerRouter.get('/', keycloak.protect("realm:admin"),MailerController.getMail)
mailerRouter.post('/createMail', keycloak.protect("realm:admin"),MailerController.createOrUpdate)
mailerRouter.delete('/removeMail', keycloak.protect("realm:admin"),MailerController.removeMails)

mailerRouter.get('/destinataries', keycloak.protect("realm:admin"), MailerDestinatariesController.getDestinataries)
mailerRouter.post('/createDestinataries', keycloak.protect("realm:admin"),MailerDestinatariesController.createOrUpdate)
mailerRouter.delete('/removeDestinatary/:id', keycloak.protect("realm:admin"),MailerDestinatariesController.removeDestinatary)

export default mailerRouter
