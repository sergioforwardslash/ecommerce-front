import Setting from "@/models/Setting";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const { name } = req.query;
    const setting = await Setting.findOne({ where: { name } });
    res.json(setting);
  }
}
