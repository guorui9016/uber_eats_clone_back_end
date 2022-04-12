import { Catch, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, Repository } from 'typeorm';
import { AccountOutputDto, CreateAccountInputDto } from './dtos/accountProfile.dto';
import { Account, Role } from './entities/account.entity';

@Catch()
@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    ){}
 
    async addAccount(input: CreateAccountInputDto): Promise<AccountOutputDto>{
        const exist = await this.accountRepository.findOne({email: input.email})
        if(exist){
            return {code: 'failed', message: 'The email already in the system.'}
        }
        const result =  await this.accountRepository.insert(this.accountRepository.create(input))
        if(!result){
            return {code: 'failed', message: "Could not create the account"}
        }
        return {code:'success', message:'The account has been created'}
    }

    

}

