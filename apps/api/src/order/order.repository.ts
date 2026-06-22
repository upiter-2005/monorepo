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

  async findBy(userId: string): Promise<Order[]> {
    return this.repository.find({ where: { user_id: userId } });
  }

  async create(payload: OrderPayload, userId: string): Promise<Order> {
    const { pair, price, amount, type, status, placedAt } = payload;
    const order = this.repository.create({
      user_id: userId,
      pair,
      price,
      amount,
      type,
      status,
      time: placedAt,
    });

    return this.repository.save(order);
  }
}
