import { inject, injectable } from "tsyringe";
import IDiariesRepository from "../repositories/IDiariesRepository";
import AppError from "@shared/errors/AppError";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'

interface Request {
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
  coryza: boolean;
  hadContactWithInfected: boolean;
  approved?: boolean;
}

@injectable()
class CreateDiaryService {
  constructor(
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository
  ) { }

  public async execute(
    data: Request,
    user: any,
    establishment: Establishment
  ): Promise<Object> {
    const entries = Object.entries(data);
    let symptoms: string[] = [];
    let responsible = [];
    let approved = true;
    entries.forEach((entries) => {
      if (entries[1]) {
        symptoms.push(this.choiceSymptom(entries[0]));
        approved = false;
      }
    });


    if (!approved) {
      const roleInfectologist = await KeycloakAdmin.getRoleByName(
        "infectologist"
      )
      if (!roleInfectologist) {
        throw new AppError("Perfil não encontrado", 404);
      }

      const role = await KeycloakAdmin.getRoleByName("responsible");

      if (!role) {
        throw new AppError("Perfil não encontrado", 404);
      }

      responsible = await KeycloakAdmin.getUsersFromRole("responsible")

      if(!responsible){
        throw new AppError("sem responsaveis", 500 )
      }
    }

    const diary = await this.diariesRepository.create({
      userId: user.id,
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
      coryza: data.coryza,
      hadContactWithInfected: data.hadContactWithInfected,
      approved,
    });

    return diary;
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
      case "coryza":
        return "Coriza";
      case "hadContactWithInfected":
        return "Contato com alguém infectado";
      default:
        return symptom;
    }
  }
}

export default CreateDiaryService;
