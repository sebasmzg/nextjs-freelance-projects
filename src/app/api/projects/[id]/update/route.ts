import { EnumProjectStatus } from "core/application/dto/project.dto";
import { ProjectModel } from "core/application/model/project.model";
import { ProjectService } from "infrastructure/services/project.service";
import { createProjectSchema } from "lib/validation/project.schema";
import { NextResponse } from "next/server";

const service = new ProjectService();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }
    const existingProject = await service.findProjectById(projectId);
    if (!existingProject) {
      return NextResponse.json(
        { message: `Project with ID ${projectId} not found` },
        { status: 404 }
      );
    }
    const body = await req.json();
    const parsed = createProjectSchema.parse(body);
    if (parsed.status && !Object.values(EnumProjectStatus).includes(parsed.status as EnumProjectStatus)) {
      return NextResponse.json(
        { message: `Invalid project status: ${parsed.status}` },
        { status: 400 }
      );
    }
    const updatedModel = new ProjectModel(
        projectId,
      parsed.title || existingProject.title,
      parsed.description !== undefined ? parsed.description : existingProject.description,
      (parsed.status as EnumProjectStatus) || existingProject.status,
      parsed.startDate ? new Date(parsed.startDate) : existingProject.startDate,
      parsed.deliveryDate ? new Date(parsed.deliveryDate) : existingProject.deliveryDate,
      existingProject.userId,
      existingProject.files,
      existingProject.createdAt,
      new Date()
    )   
    const updated = await service.updateProject(updatedModel);
    return NextResponse.json(updated, { status: 200 });
  } catch (e: unknown) {
    console.error("Error updating project:", e);
    return NextResponse.json(
      {
        message: "Error updating project",
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 400 }
    );
  }
}
