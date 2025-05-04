import {FileResponse} from "./file.dto";
import {FileModel} from "../model/file.model";

export interface ProjectRequest {
    title: string;
    description?: string;
    startDate: string;
    deliveryDate: string;
    status?: string;
}

export interface ProjectResponse {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    deliveryDate: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    files: FileResponse[];
}

export enum EnumProjectStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    ON_HOLD = "ON_HOLD",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    ARCHIVED = "ARCHIVED",
}