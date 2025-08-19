import { OperationalStatus } from "types/opreationalstatus";

export interface Role {
    id: string;
    roleName: string;
    registeredDate: string;
    description: string;
}

export interface RoleList {
    $values: Role[];
}

export type GetAllRolesResponse = OperationalStatus<RoleList>; 