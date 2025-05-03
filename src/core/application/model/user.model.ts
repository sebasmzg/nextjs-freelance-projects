import {ProjectModel} from "./project.model";

export class UserModel {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
        public projects: ProjectModel[]
    ) {}
}