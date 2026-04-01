import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  role: 'admin' | 'user';

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', nullable: true })
  fullName?: string;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn({ type: 'varchar' })
  lastLoginAt?: string;
}
