import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { BasketService } from './basket.service';
import { User, UserPayload } from '../../shared/decorators/user.decorator';
import { AddProductToBasketDto } from './dto/add-product-to-basket.dto';

@UseGuards(JwtAuthGuard)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  addProduct(@User() user: UserPayload, @Body() dto: AddProductToBasketDto) {
    return this.basketService.addProduct(user.id, dto);
  }

  /*@Post()
  create(@User() user: UserPayload) {
    return this.basketService.create(user.id);
  }*/

  @Get()
  getMyBasket(@User() user: UserPayload) {
    return this.basketService.getMyBasket(user.id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @User() user: UserPayload) {
    return this.basketService.deleteProduct(user.id, id);
  }
}
