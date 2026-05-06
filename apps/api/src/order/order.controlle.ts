import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderCreateDto } from './order.dto';
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
  async getOrders(@Req() req: RequestWithUser) {
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
