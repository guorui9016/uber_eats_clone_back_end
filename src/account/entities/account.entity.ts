
import { ArgsType, Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { EntityCore } from "src/core/entities/entity.core";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";
import { BlobOptions } from "buffer";
import { BlockList } from "net";

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
            return await bcrypt.compare(iPwd, this.password)
        } catch (error) {
            throw new InternalServerErrorException(error)    
        }
    }
}