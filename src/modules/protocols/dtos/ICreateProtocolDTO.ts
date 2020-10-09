import Diary from '@users/diaries/infra/typeorm/entities/Diary'
interface ICreateProtocolDTO {
  diary: Diary,
  userId: string,
  protocolName: string,
  protocolEndDate: Date,
  active: boolean
}
export default ICreateProtocolDTO;
