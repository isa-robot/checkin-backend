import {
    MigrationInterface,
    QueryRunner,
    TableForeignKey,
    Table,
} from 'typeorm';

export class CreateDiaries1590774876638 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'diaries',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'smellLoss',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'tasteLoss',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'appetiteLoss',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'fatigue',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'fever',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'cough',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'diarrhea',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'delirium',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'soreThroat',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'shortnessOfBreath',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'abdominalPain',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'chestPain',
                        type: 'boolean',
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
            'diaries',
            new TableForeignKey({
                columnNames: ['userId'],
                name: 'Users',
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('diaries');
    }
}
