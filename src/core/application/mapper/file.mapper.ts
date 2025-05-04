import {FileResponse} from "../dto/file.dto";
import {FileModel} from "../model/file.model";

export const toFileModelFromDb = (file: FileResponse): FileModel => {
    return new FileModel(
        file.id,
        file.name,
        file.path,
        file.mimeType,
        file.size,
        file.createdAt,
        file.updatedAt,
    );
}