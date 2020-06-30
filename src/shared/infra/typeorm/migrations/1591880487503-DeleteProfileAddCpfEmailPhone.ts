import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DeleteProfileAddCpfEmailPhone1591880487503
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "email",
        type: "varchar",
        isNullable: false,
        isUnique: true,
      })
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "phone",
        type: "varchar",
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "cpf",
        type: "varchar",
        isNullable: false,
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "cpf");
    await queryRunner.dropColumn("users", "phone");
    await queryRunner.dropColumn("users", "email");
  }
}
