import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtOptions } from './jwt.options';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule{
  static forRoot(options: JwtOptions): DynamicModule{
    return {
      module:JwtModule,
      exports:[JwtService],
      providers:[
        JwtService,
        {
          provide: 'jwt_key',
          useValue:options
        }]
    }
  } 
}
