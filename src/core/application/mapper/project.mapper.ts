import {ProjectModel} from "../model/project.model";
import {randomUUID} from "crypto";
import {ProjectRequest, ProjectResponse} from "../dto/project.dto";

/**
 * Converts a ProjectRequest DTO into a ProjectModel.
 * Useful for creating or updating project entities from API requests.
 * @param dto The project request data transfer object.
 * @param userId The ID of the user associated with the project.
 * @param existingId Optional existing project ID (for updates). If not provided, a new UUID is generated.
 * @param createdAt Optional creation date (for updates). If not provided, the current date is used.
 * @returns A ProjectModel instance.
 */
export const toProjectModel = (
    dto: ProjectRequest,
    userId: string,
    existingId?: string,
    createdAt?: Date,
): ProjectModel => {
    return new ProjectModel(
        existingId ?? randomUUID(),
        dto.title,
        new Date(dto.startDate),
        new Date(dto.deliveryDate),
        createdAt ?? new Date(),
        new Date(),
        userId,
        dto.description ?? null,
    )
}

/**
 * Converts a ProjectModel into a ProjectResponse DTO.
 * Suitable for sending project data back to the client via the API.
 * @param model The project model instance.
 * @returns A ProjectResponse data transfer object.
 */
export const toProjectResponse = (model: ProjectModel): ProjectResponse =>{
    return {
        id: model.id,
        title: model.title,
        description: model.description ?? undefined,
        startDate: model.startDate.toISOString(),
        deliveryDate: model.deliveryDate.toISOString(),
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        userId: model.userId,
    }
}