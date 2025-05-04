import {ProjectModel} from "../model/project.model";
import { ProjectResponse, EnumProjectStatus} from "../dto/project.dto";
import {FileResponse} from "../dto/file.dto";
import {toFileModelFromDb} from "./file.mapper";

/**
 * Convierte un DTO de tipo ProjectRequest en una instancia de ProjectModel.
 * Útil para crear o actualizar entidades de proyecto a partir de solicitudes de API.
 * @param data Los datos del proyecto provenientes de la base de datos.
 * @returns Una instancia de ProjectModel.
 */
export const toProjectModelFromDB = (
    data: {
        id: string;
        title: string;
        description: string | null;
        startDate: Date;
        deliveryDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string | EnumProjectStatus;
        files?: FileResponse[];
    }
): ProjectModel => {
    return new ProjectModel(
        data.id,
        data.title,
        data.description,
        data.status as EnumProjectStatus,
        data.startDate,
        data.deliveryDate,
        data.userId,
        data.files?.map(toFileModelFromDb) ?? [],
        data.createdAt,
        data.updatedAt,
    )
}

/**
 * Converts a ProjectModel into a ProjectResponse DTO.
 * Suitable for sending project data back to the client via the API.
 * @param model The project model instance.
 * @returns A ProjectResponse data transfer object.
 */
export const toProjectResponse = (model: ProjectModel): ProjectResponse => {
    return {
        id: model.id,
        title: model.title,
        description: model.description ?? undefined,
        startDate: model.startDate.toISOString(),
        deliveryDate: model.deliveryDate.toISOString(),
        status: model.status as EnumProjectStatus,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        userId: model.userId,
        files: model.files.map((f) => ({
            id: f.id,
            name: f.name,
            path: f.path,
            mimeType: f.mimeType,
            size: f.size,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
        })),
    };
};