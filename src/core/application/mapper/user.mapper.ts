import {UserModel} from "../model/user.model";
import {UserResponse} from "../dto/user.dto";
import {toProjectModelFromDB, toProjectResponse} from "./project.mapper";
import {ProjectModel} from "../model/project.model";
import {randomUUID} from "crypto";


export const toUserModel = (
    dto: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt' | 'projects'>,
    projects: ProjectModel[] = [],
    existingId: string
): UserModel => {
    return new UserModel(
        existingId ?? randomUUID(),
        dto.name,
        dto.email,
        dto.password,
        new Date(),
        new Date(),
        projects
    )
}

export const toUserModelFromDB = (data: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    projects: ProjectModel[];
}): UserModel => {
    return new UserModel(
        data.id,
        data.name,
        data.email,
        data.password,
        data.createdAt,
        data.updatedAt,
        data.projects.map(toProjectModelFromDB)
    );
};

export const toUserResponse = (user: UserModel): UserResponse => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        projects: user.projects.map(toProjectResponse),
    }
}