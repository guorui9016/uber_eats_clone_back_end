import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile:true
    }),

    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV==='dev' ? '.env.dev' : '.env.test',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nuber_eats_2',
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USER_NAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      entities:  ["dist/**/*.entity.js"],
      // entities: [Account, Verification,],
      synchronize: true,
      logging: true
    }),

    AccountModule,
    
  ]
})
export class AppModule {
  constructor(){
    console.log(process.env.DB_USER_NAME,process.env.DB_PASSWORD,)
  }
}
