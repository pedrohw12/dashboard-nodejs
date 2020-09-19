import * as Yup from "yup";
import Client from "../models/Client";
import User from "../models/User";

class ClientController {
  async index(req, res) {
    const client = await Client.findAll({
      where: { user_id: req.userId },
      order: ["date"],
      attributes: ["id", "date", "name", "address", "email", "phone_number"],
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["id", "name"],
      //   },
      // ],
    });

    return res.json(client);
  }

  async store(req, res) {
    const { date, name, address, email, phone_number } = req.body;

    const client = await Client.create({
      user_id: req.userId,
      date,
      name,
      address,
      email,
      phone_number,
    });

    return res.json(client);
  }

  async delete(req, res) {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(401).json({ message: "Client not found." });
    }

    await client.destroy();

    return res.json(client);
  }

  async update(req, res) {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(401).json({ message: "Client not found." });
    }

    await client.update(req.body);

    return res.json(client);
  }
}

export default new ClientController();
