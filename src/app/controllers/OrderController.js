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

    const orderPrices = orders.map((item) => item.price);

    const totalOrdersPrice = orderPrices.reduce((a, b) => a + b, 0);

    const orderList = {
      orders,
      totalOrdersPrice,
    };

    return res.json(orderList);
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

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(401).json({ message: "Order not found." });
    }

    await order.destroy();

    return res.json(order);
  }
}

export default new SaleController();
