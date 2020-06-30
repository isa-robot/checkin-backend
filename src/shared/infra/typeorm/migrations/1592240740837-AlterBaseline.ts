import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterBaseline1592240740837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("baselines", "profession", "occupation");

    await queryRunner.addColumn(
      "baselines",
      new TableColumn({
        name: "occupation_local",
        type: "varchar",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("baselines", "occupation_local");

    await queryRunner.renameColumn("baselines", "occupation", "profession");
  }
}
