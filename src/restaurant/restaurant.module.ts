import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entity/category.entity';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Restaurant, Category]),
  ],
  providers: [RestaurantResolver, RestaurantService],
  exports: [RestaurantService]
})
export class RestaurantModule {}
