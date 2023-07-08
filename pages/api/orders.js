import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Order from "@/models/Order";

export default async function handle(req, res) {
  try {
    const { user } = await getServerSession( req, res, authOptions );
    res.json(
      await Order.findAll({
        where: { userEmail: user.email },
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
  
}
