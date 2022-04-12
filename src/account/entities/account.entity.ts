
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { EntityCore } from "src/core/entities/entity.core";
import { Column, Entity } from "typeorm";

export enum Role{
    owner = 'owner',
    delivery = 'delivery',
    client = 'client'
}

registerEnumType(Role, {
    name: 'Role'
})

@InputType('AccountInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class Account extends EntityCore{

    @Field(()=>String)
    @Column()
    @MaxLength(100)
    name:string

    @Field(type => String)
    @Column({unique: true})
    @IsEmail()
    email: string

    @Field(()=>Role)
    @Column({enum: Role})
    role: Role

    @Field(()=>String)
    @Column()
    @MinLength(6)
    password: string

    @Field(()=>Boolean)
    @Column({default:false})
    verified?: boolean
}