import { PUser } from "../../core/application/ports/user.port";
import { UserModel } from "../../core/application/model/user.model";
import prisma from "../../lib/prisma";
import { toUserModelFromDB } from "../../core/application/mapper/user.mapper";

export class UserService implements PUser {
    async createUser(user: UserModel): Promise<UserModel> {
        const created = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });

        return toUserModelFromDB({ ...created, projects: [] });
    }

    async findUserById(userId: string): Promise<UserModel | null> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { projects: true },
        });
        if (!user) return null;
        return toUserModelFromDB(user);
    }

    async findUserByEmail(email: string): Promise<UserModel | null> {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { projects: true },
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
                password: user.password,
                updatedAt: new Date(),
            },
        });

        return toUserModelFromDB({ ...updated, projects: [] });
    }

    async deleteUser(userId: string): Promise<void> {
        await prisma.user.delete({ where: { id: userId } });
    }
}
