import { OperationalStatus } from "@/types/opreationalstatus";

export interface RegisterPayload {
  registerresponse?: string;
}
export type RegisterResponse = OperationalStatus<RegisterPayload>;
