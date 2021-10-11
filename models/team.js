const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const Team = sequelize.define("Teams", {
  //Model attributes
  teamId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  numMembers: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
  tl: {
    type: DataTypes.STRING,
    unique: true,
  },
  vtl: {
    type: DataTypes.STRING,
    unique: true,
  },
  bl_id: {
    type: DataTypes.INTEGER,
    references: {
      table: "Users",
      key: "id",
    },
  },
});

Team.belongsTo(User, { foreignKey: "bl_id" });

module.exports = Team;
