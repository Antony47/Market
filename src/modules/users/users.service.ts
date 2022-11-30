import {
  BadRequestException, ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create({ email, password }: CreateUserDto) {
    const existUser = await this.getOneByEmail(email);
    debugger;
    if (existUser) throw new BadRequestException('This user already exist');
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
    );

    const user = this.knex.table('users').insert({
      email,
      password: passwordHash,
    });

    return user;
  }

  async getOne(id: number) {
    const user = await this.knex<User>('users').where({ id });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getOneByEmail(email: string) {
    const user = await this.knex<User>('users').where({ email });
    return user[0];
  }

  async getMany(offset: number, limit: number, search?: string) {
    const users = await this.knex
      .select('email', 'name', 'info', 'age')
      .from('users')
      .whereILike('email', this.knex.raw('?', `%${search}%`))
      .offset(offset)
      .limit(limit);
    const total = await this.knex
      .table('users')
      .whereILike('email', this.knex.raw('?', `%${search}%`))
      .offset(offset)
      .limit(limit)
      .count();
    return { users, total };
  }

  async update(userId: number, id: number, { name, info, age }: UpdateUserDto) {
    if(userId !== id) throw new ForbiddenException('Not your account')
    await this.getOne(id);

    return this.knex.table('users').where({ id }).update({
      name,
      info,
      age,
    });
  }

  async delete(userId: number, id: number) {
    if(userId !== id) throw new ForbiddenException('Not your account')
    await this.knex.table('users').where({ id }).del();
  }
}
