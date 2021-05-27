import ISigner from "@modules/signature/interfaces/ISigner";
import BaseModel from "@shared/BaseClasses/models/BaseModel";

export default class Signer extends BaseModel implements ISigner{
  auths: string[];
  key?: string;
  birthday?: string;
  documentation?: string;
  email: string;
  handwritten_enabled: boolean;
  has_documentation: boolean;
  name?: string;
  official_document_enabled: boolean;
  phone_number?: string;
  selfie_enabled: boolean;
  delivery?: string;

  constructor(data: ISigner) {
    super();
    this.auths = data.auths;
    this.birthday = data.birthday;
    this.documentation = data.documentation;
    this.email = data.email;
    this.handwritten_enabled = data.handwritten_enabled;
    this.has_documentation = data.has_documentation;
    this.name = data.name;
    this.official_document_enabled = data.official_document_enabled;
    this.phone_number = data.phone_number;
    this.selfie_enabled = data.selfie_enabled;
    this.delivery = data.delivery;
  }

  fromJson(jsonData: any) {
    return Object.assign(new Signer({} as ISigner), jsonData)
  }
}
