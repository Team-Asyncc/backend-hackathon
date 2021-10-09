const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Team = sequelize.define("Teams", {
  //Model attributes
  teamId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  numMembers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  vtl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bl_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

//specifying bl_id as foreign key from User model's attribute "id"
Team.belongsTo(User, { foreignKey: "id" });

module.exports = User;
