import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddApproved1591098550877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "diaries",
      new TableColumn({
        name: "approved",
        type: "boolean",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("diaries", "approved");
  }
}
