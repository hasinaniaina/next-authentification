import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import React from "react";
import { hash } from "bcrypt";


export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { email, username, password, passwordConfirmation } = body;

    const existingUserEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserEmail) {
      return NextResponse.json(
        { success: false, message: "User with this email already exist" },
        { status: 409 }
      );
    }

    const passwordMatch = (password == passwordConfirmation);

    if (!passwordMatch) {
        return NextResponse.json(
          { success: false, message: "Password and Password confirmation not match!" },
          { status: 409 }
        );
      }

    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { success:true, user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong =>" + error },
      { status: 500 }
    );
  }
}
