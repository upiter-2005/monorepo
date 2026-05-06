import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderPayload } from './order.types';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async findByUserId(user_id: string): Promise<Order[] | null> {
    return this.repository.find({ where: { user_id } });
  }

  async create(payload: OrderPayload, time: Date): Promise<Order> {
    const { user_id, pair, price, amount, type, status } = payload;
    const order = this.repository.create({
      user_id,
      pair,
      price,
      amount,
      type,
      status,
      time,
    });

    return this.repository.save(order);
  }
}
