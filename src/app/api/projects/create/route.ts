import {NextResponse} from "next/server";
import {ProjectService} from "../../../../infrastructure/services/project.service";
import {createProjectSchema} from "../../../../lib/validation/project.schema";
import {ProjectModel} from "../../../../core/application/model/project.model";
import {EnumProjectStatus} from "../../../../core/application/dto/project.dto";

const service = new ProjectService();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = createProjectSchema.parse(body);
        const userId = "c9c84c06-1ed8-4d8c-95e1-ff22312d1c92";
        if (parsed.status && !Object.values(EnumProjectStatus).includes(parsed.status as EnumProjectStatus)) {
            return NextResponse.json(
                { message: `Invalid project status: ${parsed.status}` }, 
                { status: 400 }
            );
        }
        const projectModel = new ProjectModel(
            "",
            parsed.title,
            parsed.description ?? null,
            (parsed.status || EnumProjectStatus.DRAFT) as EnumProjectStatus,
            new Date(parsed.startDate),
            new Date(parsed.deliveryDate),
            userId,
            [],
            new Date(),
            new Date(),
        );
        const createdProject = await service.createProject(projectModel)
        return NextResponse.json(createdProject, {status: 201});
    } catch (e: unknown) {
        return NextResponse.json({
            message: 'Error creating project', 
            error: e instanceof Error ? e.message : String(e)
        }, {status: 400});    }
}