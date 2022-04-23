import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Account } from "src/account/entities/account.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthAccount } from "src/auth/authAccount.decorator";
import { AccountRole } from "src/auth/authRole.decorator";
import { CreateRestaurantInputDto, CreateRestaurantOutputDto } from "./dots/restaurant.dto";
import { RestaurantService } from "./restaurant.service";

@Resolver()
export class RestaurantResolver {
    constructor(
        private readonly restaurantService: RestaurantService
    ){}

    @Mutation(()=> CreateRestaurantOutputDto)
    @AccountRole(['owner'])
    async createRestaurant(@AuthAccount() owner: Account,@Args('input') createRestaurantInputDto:CreateRestaurantInputDto): Promise<CreateRestaurantOutputDto> {
        return await this.restaurantService.createRestaurant(owner, createRestaurantInputDto)
    }
}