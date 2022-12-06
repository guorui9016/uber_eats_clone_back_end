import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile:true,
      cors:{
        origin: 'http://localhost:3000',
        credentials: true,
      }
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env.dev'
      envFilePath: process.env.NODE_ENV==='dev' ? '.env.dev' : '.env.test',
    }),

    JwtModule.forRoot({
      jwt_key:process.env.JWT_KEY
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities:  ["dist/**/*.entity.js"],
      // entities: [Account, CoreEntity],
      synchronize: true,
      logging: true
    }),
    AccountModule,
    JwtModule,
    AuthModule,
    RestaurantModule,
    CategoryModule,
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes({
        path:"/graphql",
        method:RequestMethod.ALL
      })
  }  
}
