const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

//singup user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ data: user });
  } catch {
    res.status(500).send();
  }
});

//login in user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username })
    .populate("enrolled_courses")
    .exec();

  if (user.length === 0) {
    return res.status(404).send();
  }

  try {
    if (await bcrypt.compare(password, user[0].password)) {
      res.status(200).json({ data: user, msg: "User Log-In" });
    }
  } catch {
    res.status(404).json({ msg: "Invalid Credentials" });
  }
});

//updating user credentials
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    .populate("enrolled_courses")
    .exec();
  res.status(203).json({ data: user });
});

//get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("enrolled_courses").exec();
  res.status(200).json(user);
});

//get users by course_id
router.get("/usersByCourse/:id", async (req, res) => {
  const id = req.params.id;
  const users = await User.find({ enrolled_courses: id });
  res.status(200).json({ data: users });
});

module.exports = router;
