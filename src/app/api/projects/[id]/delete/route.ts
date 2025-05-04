import { ProjectService } from "infrastructure/services/project.service";
import { NextResponse } from "next/server";

const service = new ProjectService();

export async function DELETE(
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
    const project = await service.findProjectById(projectId);
    if (!project) {
      return NextResponse.json(
        { message: `Project with ID ${projectId} not found` },
        { status: 404 }
      );
    }
    await service.deleteProject(projectId);
    return NextResponse.json(
      { message: `Project with ID ${projectId} deleted successfully` },
      { status: 200 }
    );
  } catch (e: unknown) {
    console.error("Error deleting project:", e);
    return NextResponse.json(
      {
        message: "Error deleting project",
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
