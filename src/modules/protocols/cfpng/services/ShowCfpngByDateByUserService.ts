import { inject, injectable } from 'tsyringe';
import ICfpngRepository from '../repositories/ICfpngRepository';

@injectable()
class ShowCfpngByDateByUserService {
    constructor(
        @inject('CfpngRepository')
        private cfpngRepository: ICfpngRepository,
    ) {}

    public async execute(
        date: string,
        userId: string,
    ): Promise<Object | undefined> {
        const cfpng = await this.cfpngRepository.findByDateByUser(
            date,
            userId,
        );

        return cfpng
            ? { approved: cfpng.approved, date: cfpng.created_at }
            : undefined;
    }
}

export default ShowCfpngByDateByUserService;
