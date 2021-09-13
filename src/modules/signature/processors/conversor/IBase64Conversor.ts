export default interface IBase64Conversor {
    fromBase64(base64String: string): Buffer
    toBase64(file: Buffer): string
}