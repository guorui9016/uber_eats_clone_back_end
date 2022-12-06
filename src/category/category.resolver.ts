import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AccountRole } from "src/auth/authRole.decorator";
import { OutputDto } from "src/core/dtos/output.dto";
import { CategoryService } from "./category.service";
import { CreateCategoryInputDto, DeleteCategoryInputDto, UpdateCategoryInputDto } from "./dtos/category.dto";

@Resolver()
export class CategoryResolver{
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @Mutation(()=> OutputDto)
    @AccountRole(['any'])
    async createCategory(@Args('input') createCategoryInputDto: CreateCategoryInputDto): Promise<OutputDto>{
        return await this.categoryService.createCategory(createCategoryInputDto)
    }

    @Mutation(()=> OutputDto)
    @AccountRole(['any'])
    async updateCategory(@Args('input') updateCategoryInputDto: UpdateCategoryInputDto): Promise<OutputDto>{
        return await this.categoryService.updateCategory(updateCategoryInputDto)
    }

    // delete category
    @Mutation(()=> OutputDto)
    @AccountRole(['any'])
    async deleteCategory(@Args('input') deleteCategoryInputDto: DeleteCategoryInputDto): Promise<OutputDto>{
        return await this.categoryService.deleteCategory(deleteCategoryInputDto)
    }

    //all category list
}