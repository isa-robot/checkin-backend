import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteModules1592244616352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("resources", "Modules");
    await queryRunner.dropColumn("resources", "moduleId");
    await queryRunner.dropTable("modules");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
