import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Role } from '../enum/role.enum';
import { Profile } from 'src/profile/entities/profile.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}