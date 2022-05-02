import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantInputDto, CreateRestaurantOutputDto, UpdateRestaurantInputDto, UpdateRestaurantOutputDto } from './dots/restaurant.dto';
import { Category } from '../category/entity/category.entity';
import { Restaurant } from './entity/restaurant.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRespostry: Repository<Restaurant>,
        @InjectRepository(Category)
        private readonly categoryRespostry: Repository<Category>
    ) { }

    async createRestaurant(owner: Account, createRestaurantInputDto: CreateRestaurantInputDto): Promise<CreateRestaurantOutputDto> {
        try {
            // using name and address to check if the restaurant is exist in the system
            const existRes = await this.checkdupRestaurant(owner, createRestaurantInputDto.restaurant_name, createRestaurantInputDto.address)
            console.log(existRes)
            if (existRes) {
                return { code: 'failed', message: "The restaurant with same owner, name and address is exist in the system. " }
            }
            // save the restaurant and return the success message
            const newRestaurant = this.restaurantRespostry.create(createRestaurantInputDto)
            newRestaurant.owner = owner
            await this.restaurantRespostry.save(newRestaurant)
            return { code: 'success', message: 'The restaurant is created' }
        } catch (error) {
            return { code: 'failed', message: 'Can not create restaurant' }
        }
    }

    async updateRestaurant(owner:Account, updateRestaurantInputDto: UpdateRestaurantInputDto):Promise<UpdateRestaurantOutputDto>{
        // check the input include the restaurant uuid or not
        if(!updateRestaurantInputDto.uuid){
            return {code: "failed", message: "Needs restaurant uuid"}
        }
        // check the restaurant is exist or not
        const existRestaurant = await this.restaurantRespostry.findOne({uuid: updateRestaurantInputDto.uuid}, {relations: ['owner']})
        if(!existRestaurant){
            return {code:'failed', message:'This restaurant is not exist in the system'}
        }
        console.log(existRestaurant)
        console.log(owner)
        // check the owner is the restaurant owner or not
        if(existRestaurant.owner.uuid != owner.uuid){
            return {code:'failed', message:'You are not the owner of the restaurant'}
        }
        // check the category is exist or not
        try {
            const existCategory = await this.categoryRespostry.findByIds(updateRestaurantInputDto.categrousUuids)
        } catch (error) {
            return {code:'failed', message: 'the categories are not in the system.'}
        }
        // check the dup restaurant whith same owner
        if(updateRestaurantInputDto.restaurant_name || updateRestaurantInputDto.address){
            const dupRes = await this.checkdupRestaurant(owner, updateRestaurantInputDto.restaurant_name, updateRestaurantInputDto.address)
            if(dupRes){
                return {code:'failed', message:'the restaurant with same name and address is exist. '}
            }
        }
        // update the restaurant
        await this.restaurantRespostry.save(updateRestaurantInputDto)
        return {code:'success', message: 'new restaurant has been created'}
    }

    private async checkdupRestaurant(owner: Account, restaurant_name: string, address: string){
        const existRes = await this.restaurantRespostry.findOne({
            where: {
                owner: owner,
                restaurant_name: restaurant_name,
                address: address
            }
        })
        return existRes
    }

}
