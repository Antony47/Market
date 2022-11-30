import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './modules/config/database.config';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BasketModule } from './modules/basket/basket.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      cache: true,
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    BasketModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
