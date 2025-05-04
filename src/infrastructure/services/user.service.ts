import { PUser } from "../../core/application/ports/user.port";
import { UserModel } from "../../core/application/model/user.model";
import prisma from "../../lib/prisma";
import { toUserModelFromDB } from "../../core/application/mapper/user.mapper";

export class UserService implements PUser {
    async createUser(user: UserModel): Promise<UserModel> {
        const created = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
            include: {projects: true}
        });

        return toUserModelFromDB({ ...created, projects: created.projects || [] });
    }

    async findUserById(userId: string): Promise<UserModel | null> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { projects: {
                include: {
                    files:true
                }
            } },
        });
        if (!user) return null;
        return toUserModelFromDB(user);
    }

    async findUserByEmail(email: string): Promise<UserModel | null> {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { projects: {
                include: {
                    files:true
                }
            } },
        });
        if (!user) return null;
        return toUserModelFromDB(user);
    }

    async updateUser(user: UserModel): Promise<UserModel> {
        const updated = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
            },
            include: {projects: true}
        });

        return toUserModelFromDB({ ...updated, projects: [] });
    }

    async deleteUser(userId: string): Promise<void> {
        await prisma.user.delete({ where: { id: userId } });
    }
}
