import Diary from '@users/diaries/infra/typeorm/entities/Diary'
interface ICreateProtocolDTO {
  diaryId: Diary,
  userId: string,
  initialDate: Date,
  finalDate: Date
}
export default ICreateProtocolDTO;
