import { OperationStatus } from "./enums/systemenums";

export interface OperationalStatus<T> {
    isSuccess: boolean;
    message?: string;
    code?: string;
    errors?: string[];
    data?: T;
    operationStatus: OperationStatus;
    timestamp: string;
}