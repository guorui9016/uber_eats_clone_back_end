import { Catch, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { AccountOutputDto, CreateAccountInputDto, LoginInputDto, LoginOutputDto, UpdateAccountInputDto } from './dtos/account.dto';
import { Account, Role } from './entities/account.entity';

@Catch()
@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        private readonly jwtService:JwtService
    ){}

    async findAccountByUuid(uuid:string):Promise<Account>{
        return this.accountRepository.findOne({uuid: uuid})
    }
 
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

    async updateAccount(input: UpdateAccountInputDto):Promise<AccountOutputDto>{
        try {
            let account = this.accountRepository.create(input)
            let res = await this.accountRepository.update({uuid: account.uuid},account)
            return {code:"success", message:"The account profile has been updated"}
        } catch (error) {
            return {code: 'failed', message: "could not update the account"}                        
        }
    }

    async login(input:LoginInputDto):Promise<LoginOutputDto>{
        try {
            const account = await this.accountRepository.findOne({email: input.email})
            if(account.checkPassword(input.password)){
                const token = this.jwtService.sign({uuid: account.uuid})
                return {code:'success',token:token}
            }else{
                return {code:'failed', message:'Email and password are not match.'}
            }
        } catch (error) {
            return {code: 'failed', message:"Can not login the system"}
        }
    }
}

