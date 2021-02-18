const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const logger = require("../config/logger");

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    const msg = "You must provide a user";
    logger.error(msg);
    return res.status(400).json({
      success: false,
      error: msg,
    });
  }

  const user = new User(body);

  if (req.file) {
    const { filename } = req.file;
    user.setImageUrl(filename);
  }

  if (!user) {
    logger.error(err);
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      const msg = "User created!";
      logger.info(msg);
      return res.status(201).json({
        success: true,
        id: user._id,
        message: msg,
      });
    })
    .catch((error) => {
      logger.error(error);
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    const msg = "You must provide a body to update";
    logger.error(msg);
    return res.status(400).json({
      success: false,
      error: msg,
    });
  }

  User.findOne({ _id: req.params.id }, (err, usr) => {
    if (err) {
      logger.error(err);
      return res.status(400).json({
        err,
        message: "User not found!",
      });
    }

    const user = new User(usr);
    user.username = body.username;
    user.email = body.email;
    user.name = body.name;
    user.lastname = body.lastname;
    user.country = body.country;
    user.city = body.city;
    user.department = body.department;
    user.status = body.status;
    if (req.file) {
      if (user.imageUrl) {
        const arr = user.imageUrl.split("/");
        const path = `./uploads/${arr[arr.length - 1]}`;
        fs.unlink(path, (err) => {
          if (err) {
            logger.error(err);
            console.error(err);
            return;
          }
        });
      }
      const { filename } = req.file;
      user.setImageUrl(filename);
    }
    user
      .save()
      .then(() => {
        const msg = "User updated!";
        logger.info(msg);
        return res.status(200).json({
          success: true,
          id: user._id,
          message: msg,
        });
      })
      .catch((error) => {
        logger.error(error);
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      logger.error(err);
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      logger.error(`User not found`);
      return res.status(200).json({ success: false, error: `User not found` });
    }
    const msg = "Delete completed!";
    logger.info(msg);
    return res.status(200).json({ success: true, data: user });
  });
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      logger.error(err);
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      const msg = "User not found";
      logger.info(msg);
      return res.status(200).json({ success: false, error: msg });
    }
    return res.status(200).json({ success: true, data: user });
  });
};

getUserByLogin = async (req, res) => {
  const login = await User.findOne(
    { username: req.params.username, password: req.params.password },
    (err, user) => {
      if (err) {
        logger.error(err);
        return res.status(400).json({ success: false, error: err });
      }

      if (!user) {
        const msg = "User not found";
        logger.error(msg);
        return res
          .status(200)
          .json({ success: false, error: msg })
      }
      const tokenUser = user;

      const token = jwt.sign({ tokenUser }, "AuthLogin", {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      });
      logger.info("Login completed!");
      return res.status(200).json({ success: true, data: user, token: token });
    }
  );
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      const msg = "User not found";
      logger.error(msg);
      return res
        .status(200)
        .json({ success: false, error: msg });
    }
    logger.info("User found");
    return res.status(200).json({ success: true, data: users });
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserByLogin,
};
