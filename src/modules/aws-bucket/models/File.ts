import IFile from "../interfaces/IFile"

export default class File implements IFile {
  content: ArrayBuffer;
  extension: string;
  name: string;
  size: number;
  type: string;
}
