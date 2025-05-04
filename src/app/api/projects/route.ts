import {ProjectService} from "../../../infrastructure/services/project.service";
import { toProjectResponse } from "../../../core/application/mapper/project.mapper";
import { NextResponse } from "next/server";

const service = new ProjectService();

export async function GET(req: Request) {
    try {
        const userId = "c9c84c06-1ed8-4d8c-95e1-ff22312d1c92";
        const {searchParams} = new URL(req.url);
        const status = searchParams.get("status");
        const projects = await service.findAllProjectsByUser(userId);
        const filteredProjects = status ? projects.filter(project => project.status === status) : projects;
        const response = filteredProjects.map(toProjectResponse);

        return NextResponse.json(response, {status: 200});
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { 
                message: "Error fetching projects", 
                error: error instanceof Error ? error.message : String(error) 
            }, 
            { status: 500 }
        );
    }
}