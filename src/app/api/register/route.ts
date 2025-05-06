import bcrypt from "bcryptjs";
import { error } from "console";
import { UserModel } from "core/application/model/user.model";
import { UserService } from "infrastructure/services/user.service";
import { registerSchema } from "lib/validation/form.schema";
import { NextResponse } from "next/server";

const service = new UserService();

export async function POST(req: Request){
    try {
        const body = await req.json();
        const { name, email, password } = registerSchema.parse(body);
        const existingUser = await service.findUserByEmail(email);
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new UserModel(
            "",
            name,
            email,
            hashedPassword,
            new Date(),
            new Date(),
            []
        )
        const createdUser = await service.createUser(userModel);
        const { password: _, ...user } = createdUser;
        return new Response(JSON.stringify({ success: true, createdUser: user }), { status: 201 });
    } catch (e: unknown) {
        console.error("Error in register: ", e);
        return NextResponse.json(
            { 
              success: false, 
              message: "Error in register",
              details: e instanceof Error ? e.message : String(e) 
            },
            { status: 400 }
          );
    }
}