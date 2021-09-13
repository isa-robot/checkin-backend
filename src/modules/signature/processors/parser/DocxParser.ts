import IDocumentToParse from "./IDocumentToParse";
import IDocxParser from "./IDocxParser";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";


export default class DocxParser implements IDocxParser {
    parse(fileInfo: IDocumentToParse): Promise<Buffer> {
        console.log(fileInfo)
        return new Promise((resolve, reject) => {
            var zip = new PizZip(fileInfo.buffer);
            var doc: Docxtemplater;
            try {
                doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
            } catch (error) {
                reject(error);
                return;
            }
            
            doc.setData(fileInfo.variables);

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
