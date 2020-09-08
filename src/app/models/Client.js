import Sequelize, { Model } from "sequelize";

// colocar apenas as colunas que serão inseriadas pelo prórprio usuário

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        email: Sequelize.STRING,
        phone_number: Sequelize.STRING,
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

export default Client;
