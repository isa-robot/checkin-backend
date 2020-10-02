import { Router } from "express";

import smsRouter from "@shared/container/providers/SmsProvider/infra/http/routes/sms.routes";
import mailerRouter from '@shared/container/providers/MailsProvider/infra/http/routes/mailer.routes'
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import securityRouter from "@security/routes/security.routes";
import establishmentsRouter from "@establishments/infra/http/routes/establishments.routes";
import protocolsRouter from "@protocols/infra/http/routes/protocols.routes";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import {container} from "tsyringe";
const queue = container.resolve<IQueueProvider>("QueueProvider");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/Mails", mailerRouter);
routes.use("/Sms", smsRouter);
routes.use("/security", securityRouter);
routes.use("/establishments", establishmentsRouter);
routes.use("/protocols", protocolsRouter)

export default routes;
