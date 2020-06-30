import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateRolesResources1590605716960 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles_resources',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'rolesId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'resourcesId',
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
            'roles_resources',
            new TableForeignKey({
                columnNames: ['rolesId'],
                name: 'Roles',
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'roles_resources',
            new TableForeignKey({
                columnNames: ['resourcesId'],
                name: 'Resources',
                referencedColumnNames: ['id'],
                referencedTableName: 'resources',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles_resources');
    }
}
