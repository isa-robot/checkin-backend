import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import Resource from '@security/resources/infra/typeorm/entities/Resource';
import User from '@users/users/infra/typeorm/entities/User';

@Entity('roles')
class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany((type) => Resource)
    @JoinTable({ name: 'roles_resources' })
    resources: Resource[];

    @OneToMany((type) => User, (user) => user.role)
    users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Role;
