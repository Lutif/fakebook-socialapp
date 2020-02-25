const router = require("express").Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../../models/Profile");

//@route  api/profile/eductaion
//@desc  add_Education
//@access private

router.put(
  "/profile/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ error: err.array() });
      }
      //create education object from request
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
      //get user id
      const userId = req.user.id;
      //get profile for the user
      const profile = await Profile.findOne({ user: userId });
      //unshift eduction object to education array
      profile.education.unshift(newEdu);
      //save profile
      await profile.save();
      //return profile
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
// education: [
//     {
//       school: {
//         type: String,
//         required: true
//       },
//       degree: {
//         type: String,
//         required: true
//       },
//       fieldofstudy: {
//         type: String,
//         required: true
//       },
//       from: {
//         type: String,
//         required: true
//       },
//       current: {
//         type: Boolean,
//         default: false
//       },
//       to: {
//         type: String
//       },
//       description: {
//         type: String
//       }
//     }
//   ],
