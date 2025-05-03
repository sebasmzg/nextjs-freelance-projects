import {ProjectModel} from "../model/project.model";

export interface PProject {
    /**
     * Create new project
     * @param project The project to create
     * @returns The created project
     */
    createProject(project: ProjectModel): Promise<ProjectModel>

    /**
     * Get all projects
     * @param projectId project id
     * @returns All projects
     */
    findProjectById(projectId: string): Promise<ProjectModel | null>;

    /**
     * Get all projects
     * @param userId user id
     * @returns All projects for the user
     */
    findAllProjectsByUser(userId: string): Promise<ProjectModel[]>;

    /**
     * Update project
     * @param project The project to update
     * @returns The updated project
     */
    updateProject(project: ProjectModel): Promise<ProjectModel>;

    /**
     * Delete project
     * @param projectId The project to delete
     */
    deleteProject(projectId: string): Promise<void>;
}