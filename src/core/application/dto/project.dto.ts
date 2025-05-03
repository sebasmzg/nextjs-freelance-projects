export interface ProjectRequest {
    title: string;
    description?: string;
    startDate: string;
    deliveryDate: string;
}

export interface ProjectResponse {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    deliveryDate: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface ProjectToModel {
    title: string;
    description: string;
    startDate: Date;
    deliveryDate: Date;
    userId: string;
    id?: string;
    createdAt?: Date;
}