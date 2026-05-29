import { Injectable } from '@nestjs/common';

import { OrderRepository } from './order.repository';
import { OrderPayload, OrderResponse } from './order.types';
import { Order } from './order.entity';
import { createDate } from '../helpers/createDate';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrdersByUser(userId: string): Promise<OrderResponse[]> {
    return this.orderRepository.findBy(userId);
  }

  async createOrder(payload: OrderPayload, userId: string): Promise<Order> {
    const orderPayment = { ...payload, userId, placedAt: createDate() };
    return this.orderRepository.create(orderPayment, userId);
  }
}
