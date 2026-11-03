import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(50),
    },
    published_year: {
      type: DataTypes.INTEGER,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  },
);

export default Book;
