import ICreateUserBaselineDTO from '../dtos/ICreateUserBaselineDTO';
import Baseline from '../infra/typeorm/entities/Baseline';

export default interface IBaselinesRepository {
    create(data: ICreateUserBaselineDTO): Promise<Baseline>;
    save(baseline: Baseline): Promise<Baseline>;
    findById(id: string): Promise<Baseline | undefined>;
}
