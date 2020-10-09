import Agenda from "agenda";
import IQueueProvider from "../models/IQueueProvider";
import SendMailUserNotApproved from "@shared/infra/jobs/SendMailUserNotApproved";
import SendMailUserNotApprovedResponsible from "@shared/infra/jobs/SendMailUserNotApprovedResponsible";
import SendSmsUserNotApproved from "@shared/infra/jobs/SendSmsUserNotApproved";
import SendSmsUserNotApprovedResponsible from "@shared/infra/jobs/SendSmsUserNotApprovedResponsible";
import UsersAccession from "@shared/infra/jobs/Schedules/UsersAccession";
import UsersApprovedNotApproved from "@shared/infra/jobs/Schedules/UsersApprovedNotApproved";
import UsersSymptoms from "@shared/infra/jobs/Schedules/UsersSymptoms";
import ScheduleJobsAt from "@shared/infra/jobs/ScheduleJobsAt";
import SendMailError from "@shared/infra/jobs/SendMailError";
import SendMailForgotPassword from "@shared/infra/jobs/SendMailForgotPassword";
import SendMailJobError from "@shared/infra/jobs/SendMailJobError";
import SendMailUserProtocolAnswered from "@shared/infra/jobs/SendMailUserProtocolAnswered";
import SendMailUserProtocolByDay from "@shared/infra/jobs/SendMailUserProtocolByDay";
import usersProtocolByDaySchedule from "@shared/infra/jobs/Schedules/usersProtocolByDaySchedule";
import SendMailUserProtocolText from "@shared/infra/jobs/SendMailUserProtocolText"

export default class AgendaQueueProvider implements IQueueProvider {
  agenda: Agenda;

  constructor() {
    this.agenda = new Agenda({db:{
      address: String(process.env.MONGO_HOST),
      collection: String(process.env.MONGO_COLLECTION),
    }});
    this.registerJobs()
  }

  public async registerJobs(): Promise<void> {
    this.agenda.define("SendMailUserNotApproved", async (job) => {
      await SendMailUserNotApproved({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          attended: job.attrs.data.data.attended,
          symptoms: job.attrs.data.data.symptoms,
          establishment: job.attrs.data.data.establishment,
          responsible: job.attrs.data.data.responsible,
        },
      });
    });
    this.agenda.define("SendMailUserProtocolAnswered", async (job) => {
      await SendMailUserProtocolAnswered({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          protocol: { name: job.attrs.data.data.protocol.name, generationDate: job.attrs.data.data.protocol.generationDate},
          attended: job.attrs.data.data.attended,
          symptoms: job.attrs.data.data.symptoms,
          establishment: job.attrs.data.data.establishment,
          responsible: job.attrs.data.data.responsible,
        },
      });
    });
    this.agenda.define("SendMailUserProtocolText", async (job) => {
      await SendMailUserProtocolText({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          protocol: {
            name: job.attrs.data.data.protocol.name, generationDate: job.attrs.data.data.protocol.generationDate
          },
          mailBodyText: job.attrs.data.data.mailBodyText,
          attended: job.attrs.data.data.attended,
          establishment: job.attrs.data.data.establishment,
        },
      });
    });
    this.agenda.define("SendMailUserProtocolByDay", async (job) => {
      await SendMailUserProtocolByDay({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          frontendUrl: job.attrs.data.data.frontendUrl
        },
      });
    });

    this.agenda.define("SendMailUserNotApprovedResponsible", async (job) => {
      await SendMailUserNotApprovedResponsible({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          attended: job.attrs.data.data.attended,
          symptoms: job.attrs.data.data.symptoms,
          establishment: job.attrs.data.data.establishment,
        },
      });
    });

    this.agenda.define("SendMailError", async (job) => {
      await SendMailError({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          message: job.attrs.data.data.message,
        }
      });
    });

    this.agenda.define("SendMailJobError", async (job) => {
      await SendMailJobError({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          message: job.attrs.data.data.message,
          job: job.attrs.data.data.job,
        }
      });
    });

    this.agenda.define("SendMailForgotPassword", async (job) => {
      await SendMailForgotPassword({
        to: {
          address: job.attrs.data.to.address,
          name: job.attrs.data.to.address,
        },
        from: {
          address: job.attrs.data.from.address,
          name: job.attrs.data.from.name,
        },
        data: {
          name: job.attrs.data.data.name,
          url: job.attrs.data.data.url,
        }
      });
    });

    this.agenda.define("SendSmsUserNotApproved", async (job) => {
      await SendSmsUserNotApproved({
        attended: job.attrs.data.attended,
        establishment: job.attrs.data.establishment,
        name: job.attrs.data.name,
        phone: job.attrs.data.phone,
      });
    });
    this.agenda.define("SendSmsUserProtocol", async (job) => {
      await SendSmsUserNotApproved({
        attended: job.attrs.data.attended,
        establishment: job.attrs.data.establishment,
        name: job.attrs.data.name,
        phone: job.attrs.data.phone,
      });
    });

    this.agenda.define("SendSmsUserNotApprovedResponsible", async (job) => {
      await SendSmsUserNotApprovedResponsible({
        attended: job.attrs.data.attended,
        establishment: job.attrs.data.establishment,
        name: job.attrs.data.name,
        phone: job.attrs.data.phone,
      });
    });

    this.agenda.define("UsersAccession", { priority: "high" }, async (job) => {
      await UsersAccession();
    });

    this.agenda.define("UsersApprovedNotApproved", { priority: "high" }, async (job) => {
      await UsersApprovedNotApproved()
    });
    this.agenda.define("usersProtocolByDaySchedule", { priority: "high" }, async (job) => {
        await usersProtocolByDaySchedule()
    });

    this.agenda.define("UsersSymptoms", { priority: "high" }, async (job) => {
      await UsersSymptoms();
    });

    this.agenda.define("ScheduleJobsAt", async (job) => {
      await ScheduleJobsAt();
    });
  }
  public async runJob(name: string, data: Object): Promise<void> {
    this.agenda.now(name, data);
  }

  public async every(name: string, at: string): Promise<void> {
    this.agenda.every(at, name);
  }

  public async schedule(name: string[], at: string): Promise<void> {
    this.agenda.schedule(at, name);
  }

  public getProvider(): Agenda {
    return this.agenda;
  }

  public async stop(): Promise<any> {
    return this.agenda.stop();
  }

  public async listen(): Promise<any> {
    return this.agenda.start();
  }

}
