/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../helpers/createToken");

/**
 * User credentials are crossed check with db
 * Returns a JWT to client if valid user
 */
router.post("/login", async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});


module.exports = router;