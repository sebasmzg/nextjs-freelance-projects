export class FileModel {
    constructor(
        public readonly id: string,
        public name: string,
        public path: string,
        public mimeType: string,
        public size: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}