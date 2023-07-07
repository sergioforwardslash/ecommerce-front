import Product from "@/models/Product";
import Order from "@/models/Order";
import Setting from "@/models/Setting";
import { getSession } from "next-auth/client";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json("Method not allowed"); // 405 means Method Not Allowed
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const uniqueProductIds = [...new Set(cartProducts)];
  const products = await Product.findAll({ where: { id: uniqueProductIds } });

  let line_items = [];

  for (const productId of uniqueProductIds) {
    const productInfo = products.find((p) => p.id === productId);
    const quantity = cartProducts.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const session = await getSession({ req });

  const order = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    userEmail: session?.user?.email,
  });

  const shippingFeeSetting = await Setting.findOne({
    where: { name: "shippingFee" },
  });
  const shippingFeeCents = parseInt(shippingFeeSetting.value || "0") * 100;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: order.id },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "shipping fee",
          type: "fixed_amount",
          fixed_amount: { amount: shippingFeeCents, currency: "USD" },
        },
      },
    ],
  });

  res.json({
    url: stripeSession.url,
  });
}
