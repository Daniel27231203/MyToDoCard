import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const GET = async () => {
  const data = await prisma.goods.findMany();
  return NextResponse.json(data, { status: 200 });
};
