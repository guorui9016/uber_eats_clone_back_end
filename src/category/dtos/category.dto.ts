import { InputType, IntersectionType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/core/dtos/output.dto";
import { Category } from "../entity/category.entity";

// class updateCategoryRequets extends PickType(Category, ['uuid']){}

// class updateCategpryOption extends PartialType(PickType(Category, ['category_name', 'cover_image_url', 'restaurantUuids','restaurants'])){}
@InputType()
export class CreateCategoryInputDto extends IntersectionType(
    PickType(Category, ['category_name']), 
    PartialType(PickType(Category, ['cover_image_url', 'restaurantUuids','restaurants']))
) {}


@InputType()
export class UpdateCategoryInputDto extends IntersectionType(
    PickType(Category, ['uuid']),
    PartialType(PickType(Category,['category_name', 'cover_image_url', 'restaurantUuids', 'restaurants']))
){}


// @ObjectType()
// export class CreateCategoryOutputDto extends OutputDto{}

// @ObjectType()
// export class UpdateCategoryOutputDto extends OutputDto{}