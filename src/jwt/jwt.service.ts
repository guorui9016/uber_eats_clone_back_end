import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { JwtOptions } from './jwt.options';

@Injectable()
export class JwtService{
    constructor(
        @Inject('JwtOptions') private readonly jwtOptions: JwtOptions 
    ){}

    sign(payload: Object):string{
        return jwt.sign(payload, this.jwtOptions.jwt_key)
    }

    verify(token:string){
        return jwt.verify(token, this.jwtOptions.jwt_key)
    }
}
