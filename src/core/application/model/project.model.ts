import { FileModel } from "./file.model";
import { EnumProjectStatus } from "../dto/project.dto";

export class ProjectModel {
    constructor(
        public readonly id: string,
        public title: string,
        public description: string | null,
        public status: EnumProjectStatus,
        public startDate: Date,
        public deliveryDate: Date,
        public userId: string,
        public files: FileModel[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}