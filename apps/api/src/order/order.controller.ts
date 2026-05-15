import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderCreateDto, OrdersReturnDto } from './order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';
import { User } from '../user/user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async getOrders(@User('userId') userId: string): Promise<OrdersReturnDto[] | null> {
    return this.orderService.findOrdersByUser(userId);
  }

  @Post('')
  async create(
    @Body() payload: OrderCreateDto,
    @User('userId') userId: string,
  ): Promise<OrderCreateDto> {
    const orderPayload = { ...payload, userId };
    return this.orderService.createOrder(orderPayload);
  }
}
