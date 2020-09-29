import Diary from '@users/diaries/infra/typeorm/entities/Diary'
interface ICreateProtocolDTO {
  diaryId: Diary,
  userId: string,
  finalDate: Date,
  active: boolean

}
export default ICreateProtocolDTO;
