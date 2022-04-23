import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, MaxLength } from "class-validator";
import { CoreEntity } from "src/core/entities/entity.core";
import { Column, Entity, ManyToMany } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@InputType('CategoryInput', {isAbstract:true})
@ObjectType()
@Entity()
export class Category extends CoreEntity{
    
    @Field(()=> String)
    @Column()
    @IsString()
    @MaxLength(50)
    category_name: string

    @Field(()=> String)
    @Column({default: 'http://image_url'})
    @IsString()
    @MaxLength(300)
    cover_image_url?:string

    @Field(()=> [Restaurant], {nullable:true})
    @ManyToMany(()=> Restaurant, restaurants=> restaurants.categores, {nullable:true})
    restaurants?: Restaurant[]
}