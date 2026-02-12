import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/printify";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProduct(params.id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
}
