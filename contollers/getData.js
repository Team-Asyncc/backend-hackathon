const Scrum = require("../models/scrum");
const getData = async (req, res) => {
  const id = req.id;
  try {
    data = await Scrum.findAll({ where: { user_id: id } });
    res.status(200).json({ data: data, success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};
module.exports = getData;
