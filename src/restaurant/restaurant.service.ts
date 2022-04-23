import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantInputDto, CreateRestaurantOutputDto } from './dots/restaurant.dto';
import { Restaurant } from './entity/restaurant.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRespostry: Repository<Restaurant>
    ) { }

    async createRestaurant(user: Account, createRestaurantInputDto: CreateRestaurantInputDto): Promise<CreateRestaurantOutputDto> {
        try {
            // using name and address to check if the restaurant is exist in the system
            const existRes = await this.restaurantRespostry.findOne({
                where: {
                    owner: user,
                    restaurant_name: createRestaurantInputDto.restaurant_name,
                    address: createRestaurantInputDto.address
                }
            })
            console.log(existRes)
            if (existRes) {
                return { code: 'failed', message: "The restaurant with same owner, name and address is exist in the system. " }
            }
            // save the restaurant and return the success message
            const newRestaurant = this.restaurantRespostry.create(createRestaurantInputDto)
            await this.restaurantRespostry.save(newRestaurant)
            return { code: 'success', message: 'The restaurant is created' }
        } catch (error) {
            return { code: 'failed', message: 'Can not create restaurant' }
        }
    }
}
