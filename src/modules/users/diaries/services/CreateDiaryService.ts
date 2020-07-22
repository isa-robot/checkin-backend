import { inject, injectable, container } from "tsyringe";
import IDiariesRepository from "../repositories/IDiariesRepository";
import User from "@users/infra/typeorm/entities/User";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import IRolesRepository from "@security/roles/repositories/IRolesRepository";
import AppError from "@shared/errors/AppError";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import IUsersRepository from "@users/repositories/IUsersRepository";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";

interface Request {
  user?: User;
  smellLoss: boolean;
  tasteLoss: boolean;
  appetiteLoss: boolean;
  fatigue: boolean;
  fever: boolean;
  cough: boolean;
  diarrhea: boolean;
  delirium: boolean;
  soreThroat: boolean;
  shortnessOfBreath: boolean;
  abdominalPain: boolean;
  chestPain: boolean;
  approved?: boolean;
}

@injectable()
class CreateDiaryService {
  constructor(
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute(
    data: Request,
    user: User,
    establishment: Establishment
  ): Promise<Object> {
    const entries = Object.entries(data);
    let symptoms: string[] = [];
    let responsible: User[] = [];
    let approved = true;

    entries.map((entries) => {
      if (entries[1]) {
        symptoms.push(this.choiceSymptom(entries[0]));
        approved = false;
      }
    });

    if (!approved) {
      const roleInfectologist = await this.rolesRepository.findByName(
        "Infectologista"
      );

      if (!roleInfectologist) {
        throw new AppError("Perfil não encontrado", 404);
      }

      const infectologists = await this.usersRepository.findByRole(
        roleInfectologist.id
      );

      const role = await this.rolesRepository.findByName("Responsável");

      if (!role) {
        throw new AppError("Perfil não encontrado", 404);
      }

      responsible = establishment.users.filter((user) => {
        if (user.roleId === role.id) {
          return true;
        }
        return false;
      });

      const queue = container.resolve<IQueueProvider>("QueueProvider");
      if(MailerConfigSingleton.getIsActive()) {
        queue.runJob("SendMailUserNotApproved", {
          to: MailerConfigSingleton.getConfig(),
          from: MailerConfigSingleton.getConfig(),
          data: {
            name: "Infectologistas",
            attended: user,
            symptoms,
            establishment: establishment.name,
            responsible,
          },
        });
        responsible.map((responsible) => {
          queue.runJob("SendMailUserNotApprovedResponsible", {
            to: MailerConfigSingleton.getConfig(),
            from: MailerConfigSingleton.getConfig(),
            data: {
              name: responsible.name,
              attended: user,
              symptoms,
              establishment: establishment.name,
            },
          });
          if (process.env.NODE_ENV === "production") {

            queue.runJob("SendSmsUserNotApprovedResponsible", {
              attended: user.name,
              establishment: establishment.name,
              name: responsible.name,
              phone: responsible.phone,
            });
          }
        });

        if (process.env.NODE_ENV === "production") {
          infectologists.map((infectologist) => {
            queue.runJob("SendSmsUserNotApproved", {
              attended: user.name,
              establishment: establishment.name,
              name: infectologist.name,
              phone: infectologist.phone,
            });
          });
        }
      }
    }

    const diary = await this.diariesRepository.create({
      user,
      smellLoss: data.smellLoss,
      tasteLoss: data.tasteLoss,
      appetiteLoss: data.appetiteLoss,
      fatigue: data.fatigue,
      fever: data.fever,
      cough: data.cough,
      diarrhea: data.diarrhea,
      delirium: data.delirium,
      soreThroat: data.soreThroat,
      shortnessOfBreath: data.shortnessOfBreath,
      abdominalPain: data.abdominalPain,
      chestPain: data.chestPain,
      approved,
    });

    return { approved: diary.approved, date: diary.created_at };
  }

  private choiceSymptom(symptom: string): string {
    switch (symptom) {
      case "smellLoss":
        return "Perda do olfato";
      case "tasteLoss":
        return "Perda do paladar";
      case "appetiteLoss":
        return "Perda de apetite";
      case "fatigue":
        return "Cansaço";
      case "fever":
        return "Febre";
      case "cough":
        return "Tosse persistente";
      case "diarrhea":
        return "Diarréia";
      case "delirium":
        return "Delírios";
      case "soreThroat":
        return "Rouquidão ou Dor de Garganta";
      case "shortnessOfBreath":
        return "Falta de ar";
      case "abdominalPain":
        return "Dor abdominal";
      case "chestPain":
        return "Dor torácica";
      default:
        return symptom;
    }
  }
}

export default CreateDiaryService;
