import { OperationalStatus } from "types/opreationalstatus";

export interface LoginPayload {
  accessToken?: string;
  refreshToken?: string;
}
export type LoginResponse = OperationalStatus<LoginPayload>;
