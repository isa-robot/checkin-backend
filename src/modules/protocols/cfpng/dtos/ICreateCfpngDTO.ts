import Protocol from "@protocols/infra/typeorm/entities/Protocol";
export default interface ICreateCfpngDTO {
  breathLess: boolean;
  breathDifficulty: boolean;
  chestTightness: boolean;
  breathPressure: boolean;
  mentalConfusion: boolean;
  dizziness: boolean;
  draggedVoice: boolean;
  awakeDifficulty: boolean;
  blueSkin: boolean;
  lowPressure: boolean;
  pallor: boolean;
  sweating: boolean;
  oximetry: boolean;
  extraSymptom: boolean;
  newSymptom: string;
  approved: boolean;
  protocolGenerationDate: Date;
  userId: string;
  protocol: Protocol
}
