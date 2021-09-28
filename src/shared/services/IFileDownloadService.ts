import {Readable, Writable} from 'node:stream';
import {ClientRequest} from 'http';

export default interface IFileDownloaderService {
    download(url: string): any
}