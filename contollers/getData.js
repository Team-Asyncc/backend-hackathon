const Scrum = require("../models/scrum");
const getData = async (req, res) => {
  const team = req.team;
  try {
    data = await Scrum.findAll({ where: { team: team } });
    res.status(200).json({ data: data, success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};
module.exports = getData;
