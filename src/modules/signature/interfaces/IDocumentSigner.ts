export default interface IDocumentSigner {
  "key"?: string;
  "request_signature_key"?: string;
  "document_key"?: string;
  "signer_key"?: string;
  "sign_as"?: string;
  "created_at"?: Date;
  "updated_at"?: Date;
  "url"?: string;
  "group"?: number;
  "message"?: string;
}
