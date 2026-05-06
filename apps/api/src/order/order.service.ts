import { Injectable } from '@nestjs/common';

import { OrderRepository } from './order.repository';
import { OrderPayload } from './order.types';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrdersByUser(user_id: string): Promise<Order[] | null> {
    return this.orderRepository.findBy(user_id);
  }

  async createOrder(payload: OrderPayload): Promise<Order> {
    const createDate = new Date();
    return this.orderRepository.create(payload, createDate);
  }
}
