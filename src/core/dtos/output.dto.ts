import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OutputDto{
    @Field(()=> String)
    code: string

    @Field(() => String, {nullable:true})
    message?: string
}