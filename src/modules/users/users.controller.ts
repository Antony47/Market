import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyUsersQueryDto } from './dto/get-many-users.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { User, UserPayload } from "../../shared/decorators/user.decorator";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @Get()
  getMany(@Query() query: GetManyUsersQueryDto) {
    return this.usersService.getMany(query.offset, query.limit, query.search);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@User() user: UserPayload, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.id, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@User() user: UserPayload, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(user.id, id);
  }
}
