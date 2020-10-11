import { Op } from "sequelize";
import Stock from "../models/Stock";

class StockController {
  async index(req, res) {
    const { startDate, endDate } = req.query;
    let stocks = null;

    if (!startDate && !endDate) {
      stocks = await Stock.findAll({
        where: { user_id: req.userId },
        order: ["date"],
        attributes: ["id", "date", "price"],
      });
    }

    if (startDate && !endDate) {
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      let defaultEndDate = curr_year + "-" + curr_month + "-" + curr_date;

      stocks = await Stock.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [startDate, defaultEndDate],
          },
        },
        order: ["date"],
        attributes: ["id", "date", "price"],
      });
    } else if (!startDate && endDate) {
      let defaultStartDate = "2019-01-01";

      stocks = await Stock.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [defaultStartDate, endDate],
          },
        },
        order: ["date"],
        attributes: ["id", "date", "price"],
      });
    } else if (startDate && endDate) {
      stocks = await Stock.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: ["date"],
        attributes: ["id", "date", "price"],
      });
    }

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

  async update(req, res) {
    const stock = await Stock.findByPk(req.params.id);

    if (!stock) {
      return res.status(401).json({ message: "Stock not found." });
    }

    await stock.update(req.body);

    return res.json(stock);
  }
}

export default new StockController();
