const User = require('../models/user.model');
const Message = require('../models/message.model');
const userConnected = async (uid = "") => {

    const user = await User.findById(uid);
    user.online = true;

    await user.save();

    
    return user;
}

const userDisconnected = async (uid = "") => {

    const user = await User.findById(uid);
    user.online = false;

    await user.save();


    return user;
}

const saveMessage = async (payload) => {
    try {
        const message = Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}