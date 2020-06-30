import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterToEstablishment1591886787318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("schools", "establishments");

    await queryRunner.renameTable("users_schools", "users_establishments");

    await queryRunner.renameColumn(
      "users_establishments",
      "schoolsId",
      "establishmentsId"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("establishments", "schools");

    await queryRunner.renameTable("users_establishments", "users_schools");

    await queryRunner.renameColumn(
      "users_schools",
      "establishmentsId",
      "schoolsId"
    );
  }
}
