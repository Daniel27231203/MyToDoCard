import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, photo, category, description, raiting, price } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { message: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    if (!title || !description || !photo || !category || !price || !raiting) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingRecord = await prisma.goods.findUnique({
      where: { id: Number(id) },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    const newData = {
      title,
      photo,
      category,
      description,
      raiting,
      price,
      updatedAt: new Date().toISOString(),
    };

    await prisma.goods.update({
      where: { id: Number(id) },
      data: newData,
    });

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }
    console.error("Error updating record:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
