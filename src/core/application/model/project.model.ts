export class ProjectModel {
    constructor(
        public id: string,
        public title: string,
        public startDate: Date,
        public deliveryDate: Date,
        public createdAt: Date,
        public updatedAt: Date,
        public userId: string,
        public description?: string | null,
    ) {}
}