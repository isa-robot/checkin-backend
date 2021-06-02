import Document from "@modules/signature/model/Document";
import DocPathEnum from "@modules/signature/enums/DocPathEnum";

export default class DocumentBuilder {

  static create(type: any, content: string): Document {
    return new Document(type == "WEB" ? {
      locale: "pt-BR",
      sequence_enabled: false,
      content_base64: content,
      path: DocPathEnum.webPath,
      auto_close: true
    } : {
      locale: "pt-BR",
      sequence_enabled: false,
      content_base64: content,
      path: DocPathEnum.appPath,
      auto_close: true
    })
  }
}
