import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateBaseline1590671215339 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'baselines',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'age',
                        type: 'int4',
                        isNullable: false,
                    },
                    {
                        name: 'genre',
                        type: 'enum',
                        enum: ['M', 'F'],
                        enumName: 'Genre',
                        isNullable: false,
                    },
                    {
                        name: 'race',
                        type: 'enum',
                        enumName: 'Race',
                        enum: ['W', 'B', 'M'],
                        isNullable: false,
                    },
                    {
                        name: 'weight',
                        type: 'numeric',
                        isNullable: false,
                        precision: 3,
                    },
                    {
                        name: 'height',
                        type: 'numeric',
                        isNullable: false,
                        precision: 3,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'profession',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'recent_appointments',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'contact_covid19',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'mask',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'diabetes',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'hypertension',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'heart_disease',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'lung_disease',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'asthma',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'kidney_disease',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'smoking',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'cancer',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'corticosteroids_or_methotrexate',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'gestation',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'userId',
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
            'baselines',
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
        await queryRunner.dropTable('baselines');
    }
}
