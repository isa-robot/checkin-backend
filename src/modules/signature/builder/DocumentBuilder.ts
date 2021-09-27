import Document from "@modules/signature/model/Document";
import DocPathEnum from "@modules/signature/enums/DocPathEnum";

export default class DocumentBuilder {

  static create(type: any, content: string): Document {
    return new Document(type == "LEGAL_AGE" ? {
      locale: "pt-BR",
      sequence_enabled: false,
      content_base64: content,
      path: DocPathEnum.legalAge,
      auto_close: true
    } : type == "MINOR" ? {
      locale: "pt-BR",
      sequence_enabled: false,
      content_base64: content,
      path: DocPathEnum.minorPath,
      auto_close: true
    } : {
      locale: "pt-BR",
      sequence_enabled: false,
      content_base64: content,
      path: DocPathEnum.employeePath,
      auto_close: true
    })
  }
}
