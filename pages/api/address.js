import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Address from "@/models/Address";

export default async function handle(req, res) {
  const { user } = await getServerSession( req, res, authOptions );

  if (req.method === "PUT") {
    let address = await Address.findOne({
      where: { userEmail: user.email },
    });

    if (address) {
      address = await address.update({ ...req.body });
    } else {
      address = await Address.create({
        userEmail: user.email,
        ...req.body,
      });
    }

    res.json(address);
  }

  if (req.method === "GET") {
    const address = await Address.findOne({
      where: { userEmail: user.email },
    });
    res.json(address);
  }
}
