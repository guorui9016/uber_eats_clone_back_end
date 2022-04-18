import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AllowedRoles } from "./authRole.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //get the account info from context
        //return ture if the account is existed
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler())
        console.log("Class: AuthGuard: roles -----> " + roles)
        if (!roles) {
            return true
        }
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const account = gqlContext['req']['account']
        console.log("Class: AuthGuard: account.role -----> " + account.role)        
        if (!account) {
            return false
        }
        if (roles.includes('any')){
            return true
        }
        return roles.includes(account.role)
    }
}