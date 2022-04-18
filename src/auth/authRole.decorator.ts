import { SetMetadata } from "@nestjs/common";
import { Role } from "src/account/entities/account.entity";

export type AllowedRoles = keyof typeof Role | 'any'

export const AccountRole = (roles: AllowedRoles[]) => SetMetadata('roles', roles)