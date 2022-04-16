import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //get the account info from context
        //return ture if the account is existed
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const account = gqlContext['req']['account']
        if(account){
            return true
        }
        return false
    }
}