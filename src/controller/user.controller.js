const User = require("../models/user.model");
const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const users = await User.find({ _id: { $ne: req.uid } }) 
        .sort("-online")
        .skip(from)
        .limit(10);

  res.json({
    ok: true,
    users,
  });

};


module.exports = {
  getUsers,
};
