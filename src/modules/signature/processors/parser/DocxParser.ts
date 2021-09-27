import IDocumentToParse from "./IDocumentToParse";
import IDocxParser from "./IDocxParser";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
const replace = require("buffer-replace");

export default class DocxParser implements IDocxParser {
    parse(fileInfo: IDocumentToParse): Promise<Buffer> {
        return new Promise((resolve, reject) => {
          var zip = new PizZip(fileInfo.buffer);
          var doc: Docxtemplater;
          try {
              doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
          } catch (error) {
              reject(error);
              return;
          }

          if(fileInfo.variables) doc.setData(fileInfo.variables);

          try {
              doc.render()
          }
          catch (error) {
            reject(error);
            return;
          }

          var buf = doc.getZip()
              .generate({ type: 'nodebuffer' });

          resolve(buf);
      });
    }
}
