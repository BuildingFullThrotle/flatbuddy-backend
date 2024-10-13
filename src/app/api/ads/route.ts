import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const ads = await prisma.ad.findMany();
    return NextResponse.json(ads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}
