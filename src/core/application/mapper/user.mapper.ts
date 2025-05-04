import { UserModel } from "../model/user.model";
import { UserResponse } from "../dto/user.dto";
import { toProjectModelFromDB, toProjectResponse } from "./project.mapper";
import { ProjectModel } from "../model/project.model";
import { randomUUID } from "crypto";

export const toUserModelFromDB = (data: {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  projects: any[];
}): UserModel => {
  return new UserModel(
    data.id,
    data.name,
    data.email,
    data.password,
    data.createdAt,
    data.updatedAt,
    data.projects.map(project => {
        if (project instanceof ProjectModel) {
            return project;
        } else {
            return new ProjectModel(
                project.id,
                project.title,
                project.description,
                project.status,
                project.startDate,
                project.deliveryDate,
                project.userId,
                project.files || [], 
                project.createdAt,
                project.updatedAt
            );
        }
    })
  );
};

export const toUserResponse = (user: UserModel): UserResponse => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    projects: user.projects.map(toProjectResponse),
  };
};
