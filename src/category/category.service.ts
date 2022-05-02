import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryInputDto, UpdateCategoryInputDto } from "src/category/dtos/category.dto";
import { OutputDto } from "src/core/dtos/output.dto";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";


@Injectable()
export class CategoryService{
constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
){}

    async createCategory(createCategoryInputDto: CreateCategoryInputDto):Promise<OutputDto>{
        try {
            await this.categoryRepository.save(this.categoryRepository.create(createCategoryInputDto))
            return {code: 'success', message: 'The new category has been added'}
        } catch (error) {
            return {code:'failed', message:'Can not create the category'}            
        }
    }

    async updateCategory(updateCategoryInputDto: UpdateCategoryInputDto): Promise<OutputDto>{
        // find the exist category uuid
        const existCategory = await this.categoryRepository.findOne({uuid: updateCategoryInputDto.uuid})
        if(!existCategory){
            return {code:'failed', message: 'The category does not exist in the system'}
        }
        // update the exist category
        const dupCategory = await this.categoryRepository.findOne({category_name: updateCategoryInputDto.category_name})
        if(dupCategory){
            return {code:"failed", message:"The category name is exist in the system"}
        }
        // save the category
        await this.categoryRepository.save(updateCategoryInputDto)
        return {code:"success", message:"The category has been updated."}
    }

    

}   