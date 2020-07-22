import { inject, injectable } from 'tsyringe';
import IDiariesRepository from '../repositories/IDiariesRepository';

@injectable()
class ShowDiaryByDateByUserService {
    constructor(
        @inject('DiariesRepository')
        private diariesRepository: IDiariesRepository,
    ) {}

    public async execute(
        date: string,
        userId: string,
    ): Promise<Object | undefined> {
        const diary = await this.diariesRepository.findByDateByUser(
            date,
            userId,
        );

        return diary
            ? { approved: diary.approved, date: diary.created_at }
            : undefined;
    }
}

export default ShowDiaryByDateByUserService;
