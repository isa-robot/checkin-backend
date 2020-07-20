import {Router} from "express";

import KeycloakConfig from "@shared/keycloak/keycloak-config"
import SmsController from "@shared/container/providers/SmsProvider/infra/http/controllers/SmsController";


const smsRouter = Router()
const keycloak = KeycloakConfig.getKeycloak()

smsRouter.get("/", keycloak.protect("realm:admin"),SmsController.getSmsConfig)
smsRouter.post("/createsms", keycloak.protect("realm:admin"),SmsController.createOrUpdate)
smsRouter.delete("/delete", keycloak.protect("realm:admin"),SmsController.deleteSmsConfig)

export default smsRouter
