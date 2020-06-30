import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import User from '@users/infra/typeorm/entities/User';

@Entity('diaries')
class Diary {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('boolean')
    smellLoss: boolean;

    @Column('boolean')
    tasteLoss: boolean;

    @Column('boolean')
    appetiteLoss: boolean;

    @Column('boolean')
    fatigue: boolean;

    @Column('boolean')
    fever: boolean;

    @Column('boolean')
    cough: boolean;

    @Column('boolean')
    diarrhea: boolean;

    @Column('boolean')
    delirium: boolean;

    @Column('boolean')
    soreThroat: boolean;

    @Column('boolean')
    shortnessOfBreath: boolean;

    @Column('boolean')
    abdominalPain: boolean;

    @Column('boolean')
    chestPain: boolean;

    @Column('boolean')
    approved: boolean;

    @Column()
    userId: string;

    @ManyToOne((type) => User, (user) => user.diaries)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Diary;
