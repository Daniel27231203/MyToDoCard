import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    const deletedTodo = await prisma.goods.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "successfully deleted", deletedTodo });
  } catch (err) {
    console.error("Error deleting todo:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
