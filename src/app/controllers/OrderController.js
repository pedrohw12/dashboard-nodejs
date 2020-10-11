import { Op } from "sequelize";
import Order from "../models/Order";

class SaleController {
  async index(req, res) {
    const { startDate, endDate } = req.body;
    let orders = null;

    if (!startDate && !endDate) {
      orders = await Order.findAll({
        where: { user_id: req.userId },
        order: ["date"],
        attributes: ["id", "date", "product", "client", "price", "delivery"],
      });
    }

    if (startDate && !endDate) {
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      let defaultEndDate = curr_year + "-" + curr_month + "-" + curr_date;

      orders = await Order.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [startDate, defaultEndDate],
          },
        },
        order: ["date"],
        attributes: ["id", "date", "product", "client", "price", "delivery"],
      });
    } else if (!startDate && endDate) {
      let defaultStartDate = "2019-01-01";

      orders = await Order.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [defaultStartDate, endDate],
          },
        },
        order: ["date"],
        attributes: ["id", "date", "product", "client", "price", "delivery"],
      });
    } else if (startDate && endDate) {
      orders = await Order.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: ["date"],
        attributes: ["id", "date", "product", "client", "price", "delivery"],
      });
    }

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

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(401).json({ message: "Order not found." });
    }

    await order.update(req.body);

    return res.json(order);
  }
}

export default new SaleController();
