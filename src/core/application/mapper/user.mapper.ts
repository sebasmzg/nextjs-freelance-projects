import {UserModel} from "../model/user.model";
import {UserResponse} from "../dto/user.dto";
import { toProjectResponse} from "./project.mapper";


export const toUserModel = (
    dto: UserModel
): UserModel => {
    return new UserModel(
        dto.id,
        dto.name,
        dto.email,
        dto.password,
        dto.createdAt ?? new Date(),
        dto.updatedAt ?? new Date(),
        dto.projects ?? []
    )
}

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