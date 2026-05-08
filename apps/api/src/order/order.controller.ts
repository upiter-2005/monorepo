import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderCreateDto, OrdersReturnDto } from './order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { OrderService } from './order.service';

type RequestWithUser = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getOrders(@Req() req: RequestWithUser): Promise<OrdersReturnDto[] | null> {
    const { userId } = req.user;

    return this.orderService.findOrdersByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @Body() payload: OrderCreateDto,
    @Req() req: RequestWithUser,
  ): Promise<OrderCreateDto> {
    const { userId } = req.user;

    return this.orderService.createOrder({ ...payload, user_id: userId });
  }
}
