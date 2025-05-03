import {ProjectResponse} from "./project.dto";
import {ProjectModel} from "../model/project.model";

export interface UserRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    projects: ProjectResponse[];
}

export interface PrismaUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    projects: ProjectModel[];
}