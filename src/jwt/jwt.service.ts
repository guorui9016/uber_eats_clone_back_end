import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService{
    sign(payload: Object):string{
        return jwt.sign(payload, '12121211212')
    }

    verify(token:string):boolean{
        return jwt.verify(token, '12121211212')
    }
}
