import Sequelize, { Model } from "sequelize";

// colocar apenas as colunas que serão inseriadas pelo prórprio usuário

class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        price: Sequelize.INTEGER,
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

export default Stock;
