const { Router } = require("express");
const { getUsers } = require("../controller/user.controller");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.get("/", validateJWT, getUsers);

module.exports = router;
