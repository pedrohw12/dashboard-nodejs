import Sequelize, { Model } from "sequelize";

// colocar apenas as colunas que serão inseriadas pelo prórprio usuário

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        product: Sequelize.STRING,
        client: Sequelize.STRING,
        price: Sequelize.INTEGER,
        delivery: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

export default Order;
