import {PProject} from "../../core/application/ports/project.port";
import {ProjectModel} from "../../core/application/model/project.model";
import {prisma} from "../../lib/prisma";
import {toProjectModel} from "../../core/application/mapper/project.mapper";
import {ProjectToModel} from "../../core/application/dto/project.dto";

export class ProjectService implements PProject {
    async createProject(project: ProjectModel): Promise<ProjectModel> {
        const created = await prisma.project.create({
            data: {
                id: project.id,
                title: project.title,
                description: project.description || "",
                startDate: project.startDate,
                deliveryDate: project.deliveryDate,
                userId: project.userId,
            }
        });

        return toProjectModel({
                title: created.title,
                description: created.description,
                startDate: created.startDate.toISOString(),
                deliveryDate: created.deliveryDate.toISOString(),
            },
            created.userId,
            created.id,
            created.createdAt
        );
    }

    async findProjectById(projectId: string): Promise<ProjectModel | null> {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });
        if (!project) return null;
        return toProjectModel({
                title: project.title,
                description: project.description,
                startDate: project.startDate.toISOString(),
                deliveryDate: project.deliveryDate.toISOString(),
            },
            project.userId,
            project.id,
            project.createdAt
        );
    }

    async findAllProjectsByUser(userId: string): Promise<ProjectModel[]> {
        const projects = await prisma.project.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return projects.map((p: ProjectToModel) => {
            toProjectModel({
                    title: p.title,
                    description: p.description,
                    startDate: p.startDate.toISOString(),
                    deliveryDate: p.deliveryDate.toISOString(),
                },
                p.userId,
                p.id,
                p.createdAt
            );
        })
    }

    async updateProject(project: ProjectModel): Promise<ProjectModel> {
        const updated = await prisma.project.update({
            where: {
                id: project.id
            },
            data: {
                title: project.title,
                description: project.description,
                startDate: project.startDate,
                deliveryDate: project.deliveryDate,
                updatedAt: new Date(),
            }
        });
        return toProjectModel({
                title: updated.title,
                description: updated.description,
                startDate: updated.startDate.toISOString(),
                deliveryDate: updated.deliveryDate.toISOString(),
            },
            updated.userId,
            updated.id,
            updated.createdAt
        );
    }

    async deleteProject(projectId: string): Promise<void> {
        await prisma.project.delete({where: {id: projectId}});
    }
}