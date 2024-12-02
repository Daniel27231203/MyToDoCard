import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();
export const POST = async (req: Request) => {
  const body = await req.json();
  const { title, photo, category, description, raiting, price } = body;
  try {
    const product = { title, photo, category, description, raiting, price };
    await prisma.goods.create({
      data: product,
    });
    return NextResponse.json(
      { message: "Your product has been added successfully." },
      { status: 200 }
    );
  } catch (err) {
    error(err);
    return NextResponse.json({ message: "Server Error" });
  }
};
