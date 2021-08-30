import IDocumentToParse from "../IDocumentToParse";
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
                // Catch compilation errors (errors caused by the compilation of the template: misplaced tags)
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

    // private replaceErrors(key: string, value: any) {
    //     if (value instanceof Error) {
    //         return Object.getOwnPropertyNames(value)
    //             .reduce(function (error: any, key: string) {
    //                 error[key] = value[key];
    //                 return error;
    //             }, {});
    //     }
    //     return value;
    // }

    // private errorHandler(error): never {
    //     console.log(JSON.stringify({ error: error }, this.replaceErrors));

    //     if (error.properties && error.properties.errors instanceof Array) {
    //         const errorMessages = error.properties.errors.map(function (error) {
    //             return error.properties.explanation;
    //         }).join("\n");
    //         console.log('errorMessages', errorMessages);
    //         // errorMessages is a humanly readable message looking like this:
    //         // 'The tag beginning with "foobar" is unopened'
    //     }
    //     throw error;
    // }
}
