import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/core/dtos/output.dto";
import { Restaurant } from "../entity/restaurant.entity";

@InputType()
export class CreateRestaurantInputDto extends PickType(Restaurant, ['restaurant_name', 'address', 'description','bg_image_url']){}

@ObjectType()
export class CreateRestaurantOutputDto extends OutputDto{}