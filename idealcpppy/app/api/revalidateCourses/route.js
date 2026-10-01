import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/courses");
  return NextResponse.json({ revalidated: true });
}