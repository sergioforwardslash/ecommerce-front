import { getSession } from "next-auth/client";
import Address from "@/models/Address";

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (req.method === "PUT") {
    let address = await Address.findOne({
      where: { userEmail: session.user.email },
    });

    if (address) {
      address = await address.update({ ...req.body });
    } else {
      address = await Address.create({
        userEmail: session.user.email,
        ...req.body,
      });
    }

    res.json(address);
  }

  if (req.method === "GET") {
    const address = await Address.findOne({
      where: { userEmail: session.user.email },
    });
    res.json(address);
  }
}
