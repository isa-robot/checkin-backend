import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStatistic1592329556508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "statistics",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "value",
            type: "numeric",
            isNullable: false,
            precision: 11,
          },
          {
            name: "statisticTypeId",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "establishmentId",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "statistics",
      new TableForeignKey({
        columnNames: ["statisticTypeId"],
        name: "Types",
        referencedColumnNames: ["id"],
        referencedTableName: "statistic_types",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "statistics",
      new TableForeignKey({
        columnNames: ["establishmentId"],
        name: "Establishment",
        referencedColumnNames: ["id"],
        referencedTableName: "establishments",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("statistics");
  }
}
