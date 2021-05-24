import Signer from "@modules/signature/model/Signer";

export default class SignerBuilder {

  static create(user: any): Signer {
    return new Signer({
      selfie_enabled: false,
      phone_number: "",
      official_document_enabled: false,
      auths: ["email"],
      delivery: "email",
      handwritten_enabled: false,
      has_documentation: true,
      email: user.email
    })
  }
}
