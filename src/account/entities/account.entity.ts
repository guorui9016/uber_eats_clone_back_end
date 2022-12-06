
import { ArgsType, Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { CoreEntity } from "src/core/entities/entity.core";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";
import { BlobOptions } from "buffer";
import { BlockList } from "net";
import { Verification } from "./verification.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";

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
export class Account extends CoreEntity{

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

    @Field(()=>[Restaurant])
    @OneToMany(()=> Restaurant, restaurants => restaurants.owner)
    restaurants: Restaurant[]

    @BeforeInsert()
    @BeforeUpdate()
    async encryptPassword():Promise<void>{
        if(this.password){
            try {
                this.password = await bcrypt.hash(this.password, 10)
            } catch (error) {
                throw new InternalServerErrorException(error)
            }
        }
    }

    async checkPassword(iPwd:string):Promise<boolean>{
        try {
            console.log(`the input password is ${iPwd}, and the account pwd is ${this.password}`)
            return await bcrypt.compare(iPwd, this.password)
        } catch (error) {
            throw new InternalServerErrorException(error)    
        }
    }
}