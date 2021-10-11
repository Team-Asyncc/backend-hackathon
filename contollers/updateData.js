const Scrum = require("../models/scrum");
const updateData = async (req, res) => {
  const {
    id,
    attendance,
    saw_last_lecture,
    tha_progress,
    topics_to_cover,
    backlog_reasons,
    class_rating,
    user_id,
  } = req.body;
  try {
    const isUserExists = await Scrum.findOne({where: {user_id: user_id}})
    if(! isUserExists)
    {
        res.status(200).json({
            success: true,
            message: "user does not existe"
        });
    }
    
    const updatedData = await Scrum.update(
      {
        id: id,
        attendance,
        attendance,
        saw_last_lecture: saw_last_lecture,
        tha_progress: tha_progress,
        topics_to_cover: topics_to_cover,
        backlog_reasons: backlog_reasons,
        class_rating: class_rating,
      },
      { where: { user_id: user_id } }
    );
     res.status(201).json({
         success: true,
         message: "Upadated successfully",
         user: updatedData
     })
  } catch (err) {
      res.status(500).json({
          success: false,
          message: "something went wrong"
      })
  }
};
