import { OperationalStatus } from "types/opreationalstatus";

export interface Privilege {
  id: string;
  action: string;
  name: string;
  description: string;
}

export interface PrivilegeList {
  $values: Privilege[];
}

export interface UpdatedRolePayload {
  id: number;
  name: string;
  description: string;
  privileges: PrivilegeList;
}

export type UpdateRoleResponse = OperationalStatus<UpdatedRolePayload>; 