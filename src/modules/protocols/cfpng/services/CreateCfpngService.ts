import { inject, injectable, container } from "tsyringe";
import ICfpngRepository from "@protocols/cfpng/repositories/ICfpngRepository";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import IRolesRepository from "@security/roles/repositories/IRolesRepository";
import AppError from "@shared/errors/AppError";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import IUsersRepository from "@users/repositories/IUsersRepository";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'
import ShowBaselineService from '@users/baselines/services/ShowBaselineService';
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import GetMailerDestinataryByTypeService
  from "@shared/container/providers/MailsProvider/services/GetMailerDestinataryByTypeService";
import DestinataryTypeEnum from "@shared/container/providers/MailsProvider/enums/DestinataryTypeEnum";
import DateHelper from "@shared/helpers/dateHelper";

interface Request {
  breathLess: boolean;
  breathDifficulty: boolean;
  chestTightness: boolean;
  breathPressure: boolean;
  mentalConfusion: boolean;
  dizziness: boolean;
  draggedVoice: boolean;
  awakeDifficulty: boolean;
  blueSkin: boolean;
  lowPressure: boolean;
  pallor: boolean;
  sweating: boolean;
  oximetry: boolean;
  extraSymptom: boolean;
  newSymptom: string;
  approved?: boolean;
  protocolGenerationDate: Date;
}

@injectable()
class CreateCfpngService {
  constructor(
    @inject("CfpngRepository")
    private cfpngRepository: ICfpngRepository,
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute(
    data: Request,
    userId: string,
    establishment: Establishment
  ): Promise<Object> {

    const findProtocolActiveByNameByUser = await this.protocolRepository.findProtocolActiveByNameByUser(userId, "cfpng")

    if (!findProtocolActiveByNameByUser) {
      throw new AppError("protocol ativo nao encontrado", 404)
    }

    const protocolGenerationDate = new DateHelper().dateToStringBR(new Date(data.protocolGenerationDate))
    const protocolGenerationDateReverse = new Date(protocolGenerationDate.split("/").reverse().join("/"))

    const protocolCreatedAt = new DateHelper().dateToStringBR(new Date(findProtocolActiveByNameByUser.created_at))
    const protocolCreatedAtReverse = new Date(protocolCreatedAt.split("/").reverse().join("/"))

    const protocolEndDate = new DateHelper().dateToStringBR(new Date(findProtocolActiveByNameByUser.protocolEndDate))
    const protocolEndDateReverse = new Date(protocolEndDate.split("/").reverse().join("/"))

    if(protocolGenerationDateReverse < protocolCreatedAtReverse ||
      protocolGenerationDateReverse > protocolEndDateReverse) {
      throw new AppError("data de protocolo não se encontra no prazo", 404)
    }

    const entries = Object.entries(data);
    let symptoms: [] = [];
    let responsible = [];
    let approved = true;

    const lastDiary = await this.diariesRepository.findLastByUser(userId);
    const lastDiaryDate = lastDiary?.created_at
    const today = new Date()
    if(!lastDiary){
      throw new AppError("Diario não encontrado", 404)
    }

    entries.map((entries) => {
      let extra = true
      if(entries[1]){
        if(entries[0] == "extraSymptom" && entries[1] == false){
          extra = false
        }
        if(entries[0] != "extraSymptom" && entries[0] != "protocolGenerationDate"){
          //@ts-ignore
          symptoms.push({name: this.choiceSymptom(entries[0]), val: this.choiceValue(entries[1])});
        }
        if(entries[0] != "newSymptom"){
          approved = false
        }
      }
    });


    const roleInfectologist = await KeycloakAdmin.getRoleByName(
      "infectologist"
    )
    if (!roleInfectologist) {
      throw new AppError("Perfil não encontrado", 404);
    }

    const infectologists = await KeycloakAdmin.getUsersFromRole(
      "infectologist"
    );

    const role = await KeycloakAdmin.getRoleByName("responsible");

    if (!role) {
      throw new AppError("Perfil não encontrado", 404);
    }

    responsible = await KeycloakAdmin.getUsersFromRole("responsible")

    if (!responsible) {
      throw new AppError("sem responsaveis", 500)
    }
    const queue = container.resolve<IQueueProvider>("QueueProvider");

    const baseline = container.resolve(ShowBaselineService)
    const user = await baseline.execute(userId)

    const mailerSender = await MailerConfigSingleton

    const mailerDestinataryByTypeService = container.resolve(GetMailerDestinataryByTypeService)
    const healthServiceMail = await mailerDestinataryByTypeService.execute({type: DestinataryTypeEnum.HEALTHSERVICE})

    const generationDate = new Date(data.protocolGenerationDate)

    queue.runJob("SendMailUserProtocolAnswered", {
      to: healthServiceMail ? {
        name: healthServiceMail.name,
        address: healthServiceMail.address
      } : "",
      from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
      data: {
        name: "Infectologistas",
        protocol: {
          name: "cfpng",
          generationDate: new DateHelper().dateToStringBR(generationDate)
        },
        attended: user,
        symptoms,
        establishment: establishment.name,
        responsible,
      },
    });
    responsible.map(async (responsible: any) => {
      queue.runJob("SendMailUserProtocolAnswered", {
        to: responsible.email ? { address: responsible.email, name: responsible.firstName } : "",
        from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
        data: {
          name: responsible.name,
          protocol: "cfpng",
          attended: user,
          symptoms,
          establishment: establishment.name
        },
      });
      if (process.env.NODE_ENV === "production") {

        queue.runJob("SendSmsUserProtocol", {
          attended: user.username,
          establishment: establishment.name,
          name: responsible.name,
          phone: responsible.phone,
        });
      }
    });

    if (process.env.NODE_ENV === "production") {
      infectologists.map(async (infectologist: any) => {
        await queue.runJob("SendSmsUserProtocol", {
          attended: user.username,
          establishment: establishment.name,
          name: infectologist.name,
          phone: infectologist.phone,
        });
      });
    }
    const cfpng = await this.cfpngRepository.create({
      breathLess: data.breathLess,
      breathDifficulty: data.breathDifficulty,
      chestTightness: data.chestTightness,
      breathPressure: data.breathPressure,
      mentalConfusion: data.mentalConfusion,
      dizziness: data.dizziness,
      draggedVoice: data.draggedVoice,
      awakeDifficulty: data.awakeDifficulty,
      blueSkin: data.blueSkin,
      lowPressure: data.lowPressure,
      pallor: data.pallor,
      sweating: data.sweating,
      oximetry: data.oximetry,
      extraSymptom: data.extraSymptom,
      newSymptom: data.newSymptom,
      approved,
      protocolGenerationDate: new Date(data.protocolGenerationDate),
      protocol: findProtocolActiveByNameByUser,
      userId: userId,
    });
    return { cfpng };
  }

  private choiceValue(val: boolean | string) {
    switch (val) {
      case true:
        return 'Sim';
      case false:
        return 'Não';
      default:
        return val;
    }
  }

  private choiceSymptom(symptom: string): string {
    switch (symptom) {
      case 'breathLess':
        return 'Falta de ar';
      case 'breathDifficulty':
        return 'Dificuldade para respirar';
      case 'chestTightness':
        return 'Aperto no peito';
      case 'breathPressure':
        return 'pressão para respirar';
      case 'mentalConfusion':
        return 'Confusão mental';
      case 'dizziness':
        return 'Tonturas';
      case 'draggedVoice':
        return 'Voz arrastada';
      case 'awakeDifficulty':
        return 'Dificuldade para se manter acordado';
      case 'blueSkin':
        return 'Lábios ou face com coloração mais azulada';
      case 'lowPressure':
        return 'pressão baixa';
      case 'pallor':
        return 'palidez';
      case 'sweating':
        return 'sudorese';
      case 'oximetry':
        return 'Fez oximetria';
      case 'extraSymptom':
        return 'novo sintoma diferente de ontem';
      case 'newSymptom':
        return 'novo sintoma';
      default:
        return symptom;
    }
  }
}

export default CreateCfpngService;
