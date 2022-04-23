import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, MaxLength } from "class-validator";
import { Account } from "src/account/entities/account.entity";
import { CoreEntity } from "src/core/entities/entity.core";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Category } from "./category.entity";


@InputType('RestaurantInput', {isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity{

    @Field(()=> String)
    @Column()
    @IsString()
    @MaxLength(100)
    restaurant_name: string

    @Field(()=> String)
    @Column()
    @IsString()
    @MaxLength(200)
    address: string

    @Field(()=> String, {nullable:true})
    @Column({nullable:true})
    @MaxLength(300)
    bg_image_url?: string
    
    @Field(()=> String, {nullable:true})
    @Column({nullable:true})
    @MaxLength(1000)
    description?: string

    @Field(()=>Account)
    @ManyToOne(()=> Account, owner => owner.restaurants,{onDelete:'CASCADE'})
    owner: Account

    @Field(()=> [Category])
    @ManyToMany(()=> Category, categores=> categores.restaurants)
    @JoinTable()
    categores?: Category[]
}