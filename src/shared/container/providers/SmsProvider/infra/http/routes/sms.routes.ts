import {Router} from "express";

import SmsController from "@shared/container/providers/SmsProvider/infra/http/controllers/SmsController";

const smsRouter = Router()

smsRouter.get("/", SmsController.getSmsConfig)
smsRouter.post("/createsms", SmsController.createOrUpdate)
smsRouter.delete("/delete", SmsController.deleteSmsConfig)

export default smsRouter
