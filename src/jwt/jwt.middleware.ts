import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AccountService } from "src/account/account.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(
        private readonly jwtService:JwtService,
        private readonly accountService: AccountService
    ){}

    async use(req: Request, res:Response , next: NextFunction) {
        if('x-jwt' in req.headers){
            const token = req.headers['x-jwt']
            const decode = this.jwtService.verify(token)
            if(decode.hasOwnProperty('uuid')){
                const uuid = decode['uuid']
                const account = await this.accountService.findAccountByUuid(uuid)
                req['account'] = account
            }
        }
        next()
    }
}