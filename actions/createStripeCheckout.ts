"use server";

import stripe from "@/lib/stripe";
import { userProps } from "@/type";

export async function createStripeCheckout(
  plan: string,
  user: userProps | null | undefined
) {
  try {
    if (!plan) {
      throw new Error("Plan not found");
    }

    if (!user) {
      throw new Error("User not found");
    }
    // 3. Create and configure Stripe Checkout Session with course details
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan,
              description: plan,
              images: ["https://canvaclonebr.vercel.app/favicon.ico"],
            },
            unit_amount: 3000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://canvaclonebr.vercel.app/dashboard?success=true`,
      cancel_url: `https://canvaclonebr.vercel.app/dashboard?success=false`,
      metadata: {
        plan: plan,
        userId: user?._id ?? "",
      },
    });

    // 4. Return checkout session URL for client redirect
    return { url: session.url };
  } catch (error) {
    console.error("Error in createStripeCheckout:", error);
    throw new Error("Failed to create checkout session");
  }
}
