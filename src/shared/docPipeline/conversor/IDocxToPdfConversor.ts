export default interface IDocxToPdfConversor {
    convert(buffer: Buffer): Promise<Buffer>
}