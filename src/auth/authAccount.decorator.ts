import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const AuthAccount = createParamDecorator(
    (data: unknown, context: ExecutionContext)=>{
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const account = gqlContext['req']['account']    
        return account
    })