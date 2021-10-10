const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Team = require("./team");
const User = require("./user");

const TeamMember = sequelize.define("TeamMembers", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: "Users",
      key: "id",
    },
  },

  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: "Teams",
      key: "teamId",
    },
  },
});

TeamMember.belongsTo(User, { foreignKey: "userId" });
TeamMember.belongsTo(Team, { foreignKey: "teamId" });

module.exports = TeamMember;
