import { injectable } from "tsyringe";
import IBase64Conversor from "./IBase64Conversor"

@injectable()
export default class Base64Conversor implements IBase64Conversor {
    fromBase64(base64String: string): Buffer {
        return Buffer.from(base64String);
    }
    toBase64(file: Buffer): string {
        return file.toString("base64");
    }

    toWordBase64(file: Buffer): string {
        return "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," + file.toString("base64");
    }
}
