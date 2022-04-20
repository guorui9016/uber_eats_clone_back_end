import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { Verification } from './entities/verification.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Account, Verification]),
  ],
  providers: [AccountResolver, AccountService],
  exports:[AccountService]
})
export class AccountModule {}
