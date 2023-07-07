import { getSession } from "next-auth/client";
import Order from "@/models/Order";

export default async function handle(req, res) {
  const session = await getSession({ req });
  const orders = await Order.findAll({
    where: { userEmail: session?.user?.email },
  });
  res.json(orders);
}
