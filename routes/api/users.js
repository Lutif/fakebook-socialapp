const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

//@route  POST api/user
//@desc  Resgister a user
//@access public

router.post(
  "/users",
  [
    check("name", "Enter your name")
      .not()
      .isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter atleast six digit password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { name, password, email } = req.body;
      //check if user already exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      //bcrypt the passowrd
      password = await bcrypt.hash(password, 10);
      //get gravator
      const avatar = gravatar.url(email, {
        s: "200",
        d: "mm",
        r: "pg"
      });

      let newUser = await new User({
        name,
        email,
        password,
        avatar
      });
      await newUser.save();

      //send jwt token
      const payload = { user: { id: newUser.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            return res
              .status(500)
              .json([{ msg: "jwt token cant be created" }]);
          }
          return res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("server error");
      
    }
  }
);

module.exports = router;
