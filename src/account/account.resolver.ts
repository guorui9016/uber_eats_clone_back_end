
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { cp } from "fs";
import { AccountService } from "./account.service";
import { AccountOutputDto, CreateAccountInputDto } from "./dtos/accountProfile.dto";
import { Account } from "./entities/account.entity";

@Resolver()
export class AccountResolver {
    constructor(
        private readonly accountService: AccountService
    ){}

  @Query(()=>String)
  hi(){
    return 'hi'
  }

  @Mutation(() => AccountOutputDto)
  async createAccount(@Args('input') createAccountInputDto: CreateAccountInputDto): Promise<AccountOutputDto> {
    console.log(createAccountInputDto)
     return await this.accountService.addAccount(createAccountInputDto)
  }

  



}