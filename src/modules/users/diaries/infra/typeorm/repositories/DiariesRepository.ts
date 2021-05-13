import {
  getRepository,
  Repository,
  MoreThanOrEqual,
  Between,
  createConnection,
  getConnectionManager,
  getManager
} from "typeorm";
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import Diary from "../entities/Diary";
import ICreateUserDiaryDTO from "@users/diaries/dtos/ICreateUserDiaryDTO";
import { addHours, addMinutes, addDays, formatISO, parseISO } from "date-fns";

class DiariesRepository implements IDiariesRepository {
  private ormRepository: Repository<Diary>;

  constructor() {
    this.ormRepository = getRepository(Diary);
  }

  public async create(data: ICreateUserDiaryDTO) {
    const diary = this.ormRepository.create(data);

    await this.ormRepository.save(diary);

    return diary;
  }

  public async save(diary: Diary): Promise<Diary> {
    return await this.ormRepository.save(diary);
  }

  public async findById(id: string): Promise<Diary | undefined> {
    return await this.ormRepository.findOne({
      where: { id }
    });
  }

  public async findByDateByUser(
    date: string,
    userId: string
  ): Promise<Diary | undefined> {
    return await this.ormRepository.findOne({
      where: {
        created_at: MoreThanOrEqual(
          new Date(formatISO(parseISO(date), { representation: "date" }))
        ),
        userId,
      },
    });
  }

  public async findInDateByUser(
    date: string,
    userId: string
  ): Promise<Diary | undefined> {
    const startDate = addHours(new Date(formatISO(parseISO(date), { representation: "date" })), 0)
    const endDate = addHours(startDate, 23);
    const diary = await this.ormRepository.findOne({
      created_at: Between(startDate, endDate),
      userId: userId,
    });

    return diary;
  }

  public async findByRangeDateByUser(
    date: Date,
    userId: string
  ): Promise<Diary | undefined> {
    const endDate = addMinutes(addHours(date, 23), 59);

    const diary = await this.ormRepository.findOne({
      created_at: Between(date, endDate),
      userId: userId,
    });

    return diary;
  }

  public async findBySymptomByUser(
    symptom: string,
    userId: string
  ): Promise<Diary | undefined> {
    const diary = await this.ormRepository
      .createQueryBuilder()
      .where("Diary.userId = :userId", { userId })
      .andWhere(`Diary.${symptom} = true`, {})
      .getOne();

    return diary;
  }

  public async findAllByUser(userId: string): Promise<Diary[]> {
    return await this.ormRepository.find({ where: { userId } });
  }

  public async findLastByUser(userId: string): Promise<Diary | undefined> {
    return await this.ormRepository.findOne({ where: { userId }, order:{created_at: -1}});
  }
}

export default DiariesRepository;
