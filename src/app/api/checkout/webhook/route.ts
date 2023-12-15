import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: NextRequest) {
  const endpointSecret = process.env.STRIPE_SECRET_KEY as string;
  const body = await request.json();
  const sig = request.headers.get("stripe-signature") as string;

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    // invalid signature
    return NextResponse.error();
  }

  let intent = null;
  switch (event["type"]) {
    case "payment_intent.succeeded":
      intent = event.data.object;
      console.log("Succeeded:", intent.id);
      break;
    case "payment_intent.payment_failed":
      intent = event.data.object;
      const message = intent.last_payment_error && intent.last_payment_error.message;
      console.log("Failed:", intent.id, message);
      break;
  }

  return NextResponse.json({});
}
