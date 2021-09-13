import { injectable } from "tsyringe";
import IBase64Conversor from "./IBase64Conversor"

@injectable()
export default class Base64Conversor implements IBase64Conversor {
    fromBase64(base64String: string): Buffer {
        return Buffer.from(base64String, "base64");
    }
    toBase64(file: Buffer): string {
        return file.toString("base64");
    }
}