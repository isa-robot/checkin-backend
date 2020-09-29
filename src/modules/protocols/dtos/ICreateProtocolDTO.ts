import Diary from '@users/diaries/infra/typeorm/entities/Diary'
interface ICreateProtocolDTO {
  diary: Diary,
  userId: string,
  protocolName: string,
  finalDate: Date,
  active: boolean
}
export default ICreateProtocolDTO;
