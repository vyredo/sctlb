import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const pathname = new URL(req.url).pathname;
  const product_id = pathname.split("/")[3];
  console.log("what is product_id", product_id);
  let response;
  try {
    response = await fetch(`https://dummyjson.com/products/${product_id}`).then((res) => res.json());
    console.log("what is response", response);
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json({ response });
}
