import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.url.split("?")[1]);
  const limit = urlSearchParams.get("limit") as string;
  const skip = urlSearchParams.get("skip") as string;

  let response;
  try {
    response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then((res) => res.json());
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json({ response });
}
