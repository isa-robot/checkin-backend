import {bool} from "aws-sdk/clients/signer";

export default interface IDocumentSignHook {
  list_key: string,
  key: string,
  request_signature_key: string,
  email: string,
  name: string,
  has_documentation: boolean,
  documentation: string,
  birthday: string,
  phone_number: string,
  sign_as: string,
  delivery: string,
  url: string,
  auths: string[],
  created_at: string,
  signature: any
}
