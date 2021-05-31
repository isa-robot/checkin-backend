export default interface IFile {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}
