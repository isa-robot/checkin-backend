import StudentBaselines from "@users/studentBaselines/infra/typeorm/entities/StudentBaselines";
import ICreateStudentBaselineDTO from "@users/studentBaselines/dtos/ICreateStudentBaselineDTO";

export default interface IStudentBaselinesRepository {
    create(data: ICreateStudentBaselineDTO): Promise<StudentBaselines>;
    save(baseline: StudentBaselines): Promise<StudentBaselines>;
    findByUserId(userId: string): Promise<StudentBaselines | undefined>;
}
