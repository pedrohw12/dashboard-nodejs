import * as Yup from "yup";
import Order from "../models/Order";
import User from "../models/User";

class SaleController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: { user_id: req.userId },
      order: ["date"],
      attributes: ["id", "date", "product", "client", "price", "delivery"],
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["id", "name"],
      //   },
      // ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const { date, product, client, price, delivery } = req.body;

    const order = await Order.create({
      user_id: req.userId,
      date,
      product,
      client,
      price,
      delivery,
    });

    return res.json(order);
  }
}

export default new SaleController();
