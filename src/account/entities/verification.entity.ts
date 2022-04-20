import { CoreEntity } from "src/core/entities/entity.core";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Account } from "./account.entity";

@Entity()
export class Verification extends CoreEntity{
    @Column()
    verify_code: string

    @OneToOne(() => Account, {onDelete: "CASCADE"})
    @JoinColumn()
    account : Account

    @BeforeInsert()
    createRandomVerifyCode():void{
        this.verify_code = Math.random().toString(36).substring(2)
    }
}