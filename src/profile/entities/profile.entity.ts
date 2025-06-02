import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    age: number;

    @Column({
        type: 'text'
    })
    bio: string;

    @Column({
        type: 'uuid'
    })
    userId: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
} 