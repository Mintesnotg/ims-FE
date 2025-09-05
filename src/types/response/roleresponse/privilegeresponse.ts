import { OperationalStatus } from "@/types/opreationalstatus";

export interface PrivilegeItem {
  id: string;
  action: string;
  name: string;
  description: string;
}

export interface PrivilegeArray {
  $values: PrivilegeItem[];
}

export type AllPrivilegesResponse = OperationalStatus<PrivilegeArray>; 