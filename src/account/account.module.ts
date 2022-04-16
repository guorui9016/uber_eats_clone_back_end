import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityCore } from 'src/core/entities/entity.core';
import { JwtModule } from 'src/jwt/jwt.module';

import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Account]),
    JwtModule
  ],
  providers: [AccountResolver, AccountService],
  exports:[AccountService]
})
export class AccountModule {}
