import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OrderStatus, OrderType } from '@org/types';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar' })
  pair: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'varchar' })
  type: OrderType;

  @Column({ type: 'varchar' })
  status: OrderStatus;

  @CreateDateColumn()
  time: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
