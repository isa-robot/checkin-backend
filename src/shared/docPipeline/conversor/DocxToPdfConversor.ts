const libre = require("libreoffice-convert");
import IDocxToPdfConversor from "./IDocxToPdfConversor";
import { injectable } from "tsyringe"

@injectable()
export default class DocxToPdfConversor implements IDocxToPdfConversor {
  private extend = '.pdf'

  convert(buffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      libre.convert(buffer, this.extend, undefined, (err: Error, done: Buffer) => {
        if (err) {
          reject(`Error converting file: ${err}`);
        }

        resolve(done);
      });
    });
  }

}