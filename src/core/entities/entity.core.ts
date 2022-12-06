import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class CoreEntity{
    @Field(()=>String)
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @CreateDateColumn({select:false})
    createdAt: Date

    @UpdateDateColumn({select:false})
    updatedAt: Date

    @DeleteDateColumn({select:false})
    deletedAt: Date
}