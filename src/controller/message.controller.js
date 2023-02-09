const Message = require("../models/message.model");

const getChat = async (req, res) => {
  const myId = req.uid;
  const messagesWho = req.params.who;

  const last30 = await Message.find({
    $or: [
      { from: myId, to: messagesWho },
      { from: messagesWho, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    messages: last30,
  });
};

module.exports = {
    getChat,
};
