import { Router } from "express";

import smsRouter from "@shared/container/providers/SmsProvider/infra/http/routes/sms.routes";
import mailerRouter from '@shared/container/providers/MailsProvider/infra/http/routes/mailer.routes'
import usersRouter from "@modules/users/users/infra/http/routes/users.routes";
import securityRouter from "@security/routes/security.routes";
import establishmentsRouter from "@establishments/infra/http/routes/establishments.routes";
import protocolsRouter from "@protocols/infra/http/routes/protocols.routes";
import sendMailRouter from "@shared/container/providers/MailsProvider/infra/http/routes/sendMail.routes";
import signatureRoutes from "@modules/signature/api/routes/signature.routes";
import responsibleRoutes from "@users/responsible/api/routes/responsible.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/mails", mailerRouter);
routes.use("/send-mail", sendMailRouter)
routes.use("/sms", smsRouter);
routes.use("/security", securityRouter);
routes.use("/establishments", establishmentsRouter);
routes.use("/protocols", protocolsRouter);
routes.use("/signature", signatureRoutes);
routes.use("/minor-responsible", responsibleRoutes);

export default routes;
