import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/core/dtos/output.dto";
import { Account } from "../entities/account.entity";

@InputType()
export class CreateAccountInputDto extends PickType(Account, ['email', 'password', 'name', 'role']){}

@ObjectType()
export class AccountOutputDto extends OutputDto{}
