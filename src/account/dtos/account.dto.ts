import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/core/dtos/output.dto";
import { Account } from "../entities/account.entity";

@InputType()
export class CreateAccountInputDto extends PickType(Account, ['email', 'password', 'name', 'role']){}

@InputType()
export class UpdateAccountInputDto extends PartialType(PickType(Account, ['uuid', 'email', 'name', 'password', 'role'])){} 

@InputType()
export class LoginInputDto extends PickType(Account, ['email', 'password']){}

@ObjectType()
export class AccountOutputDto extends OutputDto{}

@ObjectType()
export class LoginOutputDto extends OutputDto{
    @Field(()=>String,{nullable: true})
    token?: string
}

