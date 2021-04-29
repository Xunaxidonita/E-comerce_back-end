// import important parts of sequelize library
const { Model, DataTypes, Sequelize } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      isDecimal: true,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10,
      isNumeric: true,
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);
// define columns

module.exports = Product;
