import * as Yup from "yup";
import Stock from "../models/Stock";
import User from "../models/User";

class StockController {
  async index(req, res) {
    const stocks = await Stock.findAll({
      where: { user_id: req.userId },
      order: ["date"],
      attributes: ["id", "date", "price"],
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["id", "name"],
      //   },
      // ],
    });

    const stockPrices = stocks.map((item) => item.price);

    const totalStockPrice = stockPrices.reduce((a, b) => a + b, 0);

    const stockList = {
      stocks,
      totalStockPrice,
    };

    return res.json(stockList);
  }

  async store(req, res) {
    const { date, price } = req.body;

    const stock = await Stock.create({
      user_id: req.userId,
      date,
      price,
    });

    return res.json(stock);
  }

  async delete(req, res) {
    const stock = await Stock.findByPk(req.params.id);

    if (!stock) {
      return res.status(401).json({ message: "Stock not found." });
    }

    await stock.destroy();

    return res.json(stock);
  }
}

export default new StockController();