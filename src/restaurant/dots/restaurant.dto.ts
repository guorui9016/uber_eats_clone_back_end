import { InputType, ObjectType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/core/dtos/output.dto";
import { Restaurant } from "../entity/restaurant.entity";

@InputType()
export class CreateRestaurantInputDto extends PickType(Restaurant, ['restaurant_name', 'address', 'description','bg_image_url']){}


@InputType()
export class UpdateRestaurantInputDto extends PartialType(OmitType(Restaurant, ['createdAt','deletedAt','updatedAt'])){}

@ObjectType()
export class CreateRestaurantOutputDto extends OutputDto{}

@ObjectType()
export class UpdateRestaurantOutputDto extends OutputDto{}