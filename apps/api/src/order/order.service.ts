import { Injectable } from '@nestjs/common';

import { OrderRepository } from './order.repository';
import { OrderPayload } from './order.types';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  //   async getOrders(params: UserParamDto, pagination: UserPaginationDto): Promise<UsersReturn> {
  //    // return this.orderRepository.findByParam(params, pagination);
  //   }

  async createOrder(payload: OrderPayload): Promise<Order> {
    const createDate = new Date();
    return this.orderRepository.create(payload, createDate);
  }
}
