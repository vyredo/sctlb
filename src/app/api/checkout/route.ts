import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

export const revalidate = 60;

const secret = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(secret);

export async function GET(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.url);
  const id = urlSearchParams.get("id") as string;

  // "pi_3OKe3TBIlFOPTHcl02S4nriQ";
  const stripe = new Stripe(secret);
  let response;
  try {
    response = await stripe.paymentIntents.retrieve(id);
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json({ response });
}

// ==================== POST ====================
async function chargeWithTestAccount(amount: number, metadata: Record<string, any>) {
  const _amt = Number(amount);
  if (_amt < 0) throw new Error("Amount must be greater than 0");
  if (isNaN(_amt)) throw new Error("Amount must be a number");
  const response = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method: "pm_card_visa",
    confirm: true,
    payment_method_types: ["card"],
    metadata,
  });
  return response;
}

export async function POST(req: NextRequest) {
  // @ts-ignore the type failed on next@14
  const body = await req.json();
  const { amount, metadata } = body;
  try {
    const _amt = Number(amount);
    if (_amt < 0) throw new Error("Amount must be greater than 0");
    if (isNaN(_amt)) throw new Error("Amount must be a number");
    const response = await chargeWithTestAccount(_amt, metadata);
    return NextResponse.json({
      response: {
        id: response.id,
        status: response.status,
        amount: response.amount,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}
