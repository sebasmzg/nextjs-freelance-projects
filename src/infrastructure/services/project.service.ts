import { PProject } from "../../core/application/ports/project.port";
import { ProjectModel } from "../../core/application/model/project.model";
import prisma from "../../lib/prisma";
import { toProjectModelFromDB } from "../../core/application/mapper/project.mapper";
import { EnumProjectStatus } from "../../core/application/dto/project.dto";

export class ProjectService implements PProject {
  async createProject(project: ProjectModel): Promise<ProjectModel> {
    
    const created = await prisma.project.create({
      data: {
        title: project.title,
        description: project.description || null,
        status: project.status,
        startDate: project.startDate,
        deliveryDate: project.deliveryDate,
        userId: project.userId,
      },
      include: {
        files: true,
      },
    });

    return toProjectModelFromDB(created);
  }

  async findProjectById(projectId: string): Promise<ProjectModel | null> {
    if (!projectId || typeof projectId !== "string") {
      return null;
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { files: true },
    });

    if (!project) return null;

    return toProjectModelFromDB(project);
  }

  async findAllProjectsByUser(userId: string): Promise<ProjectModel[]> {
    if (!userId || typeof userId !== "string") {
      return [];
    }
    const projects = await prisma.project.findMany({
      where: { userId },
      include: { files: true },
      orderBy: { createdAt: "desc" },
    });

    return projects.map(toProjectModelFromDB);
  }

  async updateProject(project: ProjectModel): Promise<ProjectModel> {
    if (!project || !project.id) {
      throw new Error("Invalid project data");
    }
    const updated = await prisma.project.update({
      where: { id: project.id },
      data: {
        title: project.title,
        description: project.description || null,
        startDate: project.startDate,
        deliveryDate: project.deliveryDate,
        status: project.status,
        updatedAt: new Date(),
      },
      include: {
        files: true,
      },
    });

    return toProjectModelFromDB(updated);
  }

  async deleteProject(projectId: string): Promise<void> {
    if (!projectId || typeof projectId !== "string") {
      throw new Error("Invalid project ID");
    }
    try {
        await prisma.project.delete({ where: { id: projectId } });
    } catch (error) {
        const prismaError = error as { code?: string; message: string };
        if (prismaError.code === 'P2025') {
            throw new Error(`Project with id ${projectId} not found`);
        }
        throw error;
    }
  }

  private validateProjectStatus(status: string): void {
    const validStatuses = Object.values(EnumProjectStatus);
    if (!validStatuses.includes(status as EnumProjectStatus)) {
      throw new Error(`Invalid project status: ${status}. Valid values are: ${validStatuses.join(', ')}`);
    }
  }
}
