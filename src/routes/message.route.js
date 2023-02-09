const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getChat } = require("../controller/message.controller");

const router = Router();

router.get("/:who", validateJWT, getChat);

module.exports = router;
