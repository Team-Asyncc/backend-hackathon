const Team = require("../models/team");

const addNewTeam = async (req, res) => {
  try {
    const { team, tl, vtl, bl_id } = req.query;
    let teamExists = await validateTeam(team);
    if (teamExists) {
      return res.status(400).json({
        message: `The team name ${team} already exists`,
        success: false,
      });
    }

    const newTeam = new Team({
      teamName: team,
      tl: tl,
      vtl: vtl,
      bl_id: bl_id,
    });

    await newTeam.save();

    return res.status(201).json({
      message: "A new team has been registered",
      success: true,
      team: newTeam,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create the new team",
      success: false,
      err: err,
    });
  }
};

const validateTeam = async (team) => {
  let teamExists = await Team.findOne({ where: { teamName: team } });
  return teamExists;
};

module.exports = addNewTeam;
