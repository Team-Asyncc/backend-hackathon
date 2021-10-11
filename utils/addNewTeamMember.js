const TeamMember = require("../models/teamMembers");
const User = require("../models/user");
const Team = require("../models/team");
const { findOne } = require("../models/user");

const addNewTeamMember = async (username, team, res) => {
  try {
    const user = await getUser(username);
    if (!user) {
      res.status(200).json({
        message: "User doesnt exist",
        success: false,
      });
    }

    const teamObj = await getTeam(team);
    if (!teamObj) {
      res.status(200).json({
        message: "Team doesnt exist",
        success: false,
      });
    }

    const foundUser = await userAlreadyInATeam(user.id);

    if (foundUser) {
      if (foundUser.teamId === teamObj.teamId) {
        return res.status(201).json({
          message: "User is already in the same team",
          success: false,
        });
      } else {
        try {
          const result = await TeamMember.update(
            { teamId: teamObj.teamId },
            { where: { userId: user.id } }
          );
          return res.status(201).json({
            message: "User's team has been updated",
            success: true,
            user: user,
            team: teamObj,
          });
        } catch (err) {
          return res.status(500).json({
            message: "Couldn't update user's team",
            success: false,
          });
        }
      }
    }

    const newMember = new TeamMember({
      userId: user.id,
      teamId: teamObj.teamId,
    });

    await newMember.save();

    return res.status(201).json({
      message: "User has been added to the team",
      success: true,
      user: user,
      team: teamObj,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to add user to the team",
      success: false,
      err: err,
    });
  }
};

const getUser = async (username) => {
  let user = await User.findOne({ where: { username: username } });
  return user;
};

const getTeam = async (team) => {
  let teamObj = await Team.findOne({ where: { teamName: team } });
  return teamObj;
};

const userAlreadyInATeam = async (userId) => {
  const findUser = await TeamMember.findOne({ where: { userId: userId } });
  return findUser;
};

module.exports = addNewTeamMember;
