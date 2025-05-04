import { z } from "zod";
import { EnumProjectStatus } from "../../core/application/dto/project.dto";



export const createProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    startDate: z.string().refine((date: string) => !isNaN(Date.parse(date)), {message: "Invalid start date"}),
    deliveryDate: z.string().refine((date: string) => !isNaN(Date.parse(date)), {message: "Invalid delivery date"}),
    status: z.nativeEnum(EnumProjectStatus).optional(),
})

export const updateProjectSchema = createProjectSchema.partial().extend({
    id: z.string().uuid({ message: "Invalid project ID" })
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectStatus = z.infer<typeof EnumProjectStatus>;