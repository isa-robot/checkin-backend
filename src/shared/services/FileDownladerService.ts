import https from 'https';
import { ClientRequest, IncomingMessage } from 'http';
import { injectable } from "tsyringe";
import IFileDownloaderService from "./IFileDownloadService";
import { Readable, Writable, Duplex } from 'stream';


@injectable()
export default class FileDownloaderService implements IFileDownloaderService {
    constructor() { }

    download(url: string): any {
        if (url) {
            return this.requestForFile(url);
        }
        throw new Error("Must especify url");

    }

    private requestForFile(url: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {

            https.get(url, function (response: IncomingMessage) {
                if (response.statusCode === 200) {
                    let buffer: Buffer[] = [];        

                    response.on('data', (data)=> {
                        buffer.push(data);
                    });
                    response.on('end', ()=> {
                        resolve(Buffer.concat(buffer));
                    });
                } else {
                    throw new Error(response.statusCode?.toString());
                }
            }).on('error', (err: any) => {
                console.log('ERROR', err)
            })
        });

    }

}