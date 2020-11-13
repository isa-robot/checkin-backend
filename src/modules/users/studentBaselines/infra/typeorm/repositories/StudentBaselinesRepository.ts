import { getRepository, Repository } from 'typeorm';
import StudentBaselines from "@users/studentBaselines/infra/typeorm/entities/StudentBaselines";
import IStudentBaselinesRepository from "@users/studentBaselines/repositories/IStudentBaselinesRepository";
import ICreateStudentBaselineDTO from "@users/studentBaselines/dtos/ICreateStudentBaselineDTO";

class StudentBaselinesRepository implements IStudentBaselinesRepository {
    private ormRepository: Repository<StudentBaselines>;

    constructor() {
        this.ormRepository = getRepository(StudentBaselines);
    }

    public async create(data: ICreateStudentBaselineDTO) {
        const baseline = this.ormRepository.create(data);

        await this.ormRepository.save(baseline);

        return baseline;
    }

    public async save(baseline: StudentBaselines): Promise<StudentBaselines> {
        return await this.ormRepository.save(baseline);
    }

    public async findByUserId(userId: string): Promise<StudentBaselines | undefined> {
        return await this.ormRepository.findOne({userId: userId});
    }
}

export default StudentBaselinesRepository;
