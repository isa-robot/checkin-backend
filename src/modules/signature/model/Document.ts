import ICreateDocument from "@modules/signature/interfaces/ICreateDocument";

export default class Document implements ICreateDocument {
  auto_close: boolean;
  content_base64: string;
  locale: string;
  path: string;
  sequence_enabled: boolean;

  constructor(data: ICreateDocument) {
    this.auto_close = data.auto_close;
    this.content_base64 = data.content_base64;
    this.locale = data.locale;
    this.path = data.path;
    this.sequence_enabled = data.sequence_enabled;
  }
}
