import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateResources1590600940624 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'resources',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'to',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'icon',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'moduleId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
        await queryRunner.createForeignKey(
            'resources',
            new TableForeignKey({
                columnNames: ['moduleId'],
                name: 'Modules',
                referencedColumnNames: ['id'],
                referencedTableName: 'modules',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('resources');
    }
}
