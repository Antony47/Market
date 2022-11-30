import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { User, UserPayload } from '../../shared/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@User() user: UserPayload, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user.id, dto.status);
  }

  @Get(':id')
  getOne(@User() user: UserPayload, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOne(user.id, id);
  }

  @Get()
  getAll(@User() user: UserPayload) {
    return this.ordersService.getAll(user.id);
  }

  @Patch(':id')
  update(
    @User() user: UserPayload,
    @Param('id', ParseIntPipe) id,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.update(user.id, id, dto.status);
  }

  @Delete(':id')
  delete(@User() user: UserPayload, @Param('id', ParseIntPipe) id) {
    return this.ordersService.delete(user.id, id);
  }
}
