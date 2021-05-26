import {createHmac} from "crypto";

export default class EncryptHelper {

  static Hmac(value: string) {
    return createHmac("sha256", value)
      .digest("hex")
      .toString();
  }
}
