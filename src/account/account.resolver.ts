
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { cp } from "fs";
import { AuthAccount } from "src/auth/authAccount.decorator";
import { AccountRole } from "src/auth/authRole.decorator";
import { UpdateEvent } from "typeorm";
import { AccountService } from "./account.service";
import { AccountOutputDto, CreateAccountInputDto, LoginInputDto, LoginOutputDto, UpdateAccountInputDto } from "./dtos/account.dto";
import { Account } from "./entities/account.entity";

@Resolver()
export class AccountResolver {
    constructor(
        private readonly accountService: AccountService
    ) { }

    @Query(() => String)
    hi() {
        return 'hi'
    }

    @AccountRole(['any'])
    @Query(() => Account)
    async me(@AuthAccount() account: Account): Promise<Account> {
        return account
    }

    @Mutation(() => AccountOutputDto)
    async createAccount(@Args('input') createAccountInputDto: CreateAccountInputDto): Promise<AccountOutputDto> {
        return await this.accountService.addAccount(createAccountInputDto)
    }

    @AccountRole(['any'])
    @Mutation(() => AccountOutputDto)
    async updateAccount(@Args('input') updateAccountInputDto: UpdateAccountInputDto): Promise<AccountOutputDto> {
        return await this.accountService.updateAccount(updateAccountInputDto)
    }

    @Mutation(() => LoginOutputDto)
    async login(@Args('input') loginInputDto: LoginInputDto): Promise<LoginOutputDto> {
        return await this.accountService.login(loginInputDto)
    }
}