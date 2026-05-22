import { Injectable } from '@nestjs/common';

import { OrderRepository } from './order.repository';
import { OrderPayload, OrderReturn } from './order.types';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrdersByUser(userId: string): Promise<OrderReturn[]> {
    return this.orderRepository.findBy(userId);
  }

  async createOrder(payload: OrderPayload): Promise<Order> {
    const orderPayment = { ...payload, time: new Date() };
    return this.orderRepository.create(orderPayment);
  }
}
