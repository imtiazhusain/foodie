import userModel from "../models/User.model.js";

import CustomErrorHandler from "../middlewares/errors/customErrorHandler.js";
import bcrypt from "bcrypt";

import joiValidation from "../utils/joiValidation.js";
import generateJwtTokens from "../utils/generateJwtTokens.js";
import mongoose from "mongoose";
import HelperMethods from "../utils/helper.js";
class User {
  static registerUser = async (req, res, next) => {
    try {
      req.body.profile_pic = req?.file?.filename;
      const profile_pic = req.body.profile_pic;

      const { name, email, password } = req.body;
      // validation

      const { error } = joiValidation.registerUserValidation(req.body);

      if (error) {
        console.log(error.message);
        return next(error);
      }

      const exist = await userModel.exists({ email: email });

      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }

      // hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      const registerUser = new userModel({
        name,
        email,
        profile_pic,
        password: hashedPassword,
      });

      const result = await registerUser.save();

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static editUser = async (req, res, next) => {
    try {
      // here i also coment 2 lines bcz i am not using multer here
      // req.body.profile_pic = req?.file?.filename;
      const profile_pic = req?.file?.filename;

      const { name, email, user_id, password } = req.body;

      if (req?.body?.profile_pic) {
        delete req.body.profile_pic;
      }

      // validation
      const isValidID = mongoose.Types.ObjectId.isValid(user_id);

      if (!isValidID) {
        return next(CustomErrorHandler.invalidId("Invalid user ID"));
      }
      const { error } = joiValidation.editUser(req.body);

      if (error) {
        console.log(error.message);
        return next(error);
      }

      const exist = await userModel.exists({
        email: email,
        _id: { $ne: user_id },
      });

      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      let userUpdatedData = {
        name: name,
        email: email,
        profile_pic: profile_pic ? profile_pic : null,
        ...(hashedPassword && { password: hashedPassword }),
      };

      if (!userUpdatedData?.profile_pic) {
        delete userUpdatedData.profile_pic;
      }

      let userPreviousData = await userModel.findById(user_id);

      if (userPreviousData?.profile_pic) {
        HelperMethods.deleteFileIfExists(userPreviousData.profile_pic);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        user_id,
        userUpdatedData,
        { new: true } // Return the updated document
      );

      updatedUser.profile_pic = `${
        process.env.SERVER_URL ? process.env.SERVER_URL : ""
      }/images/uploads/${updatedUser.profile_pic}`;

      let userData = {
        email: updatedUser.email,
        name: updatedUser.name,
        profile_pic: updatedUser.profile_pic,
      };

      return res.status(201).json({
        status: "success",
        message: "User updated successfully",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      // validation
      const { error } = joiValidation.logInBodyValidation(req.body);

      if (error) {
        return next(error);
      }

      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      //   compare password
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      //   token

      const accessToken = await generateJwtTokens(user);

      user.profile_pic = `${
        process.env.SERVER_URL ? process.env.SERVER_URL : ""
      }/images/uploads/${user.profile_pic}`;

      let userData = {
        _id: user._id,
        email: user.email,
        name: user.name,
        profile_pic: user.profile_pic,

        access_token: accessToken,
        role: user.role,
      };
      res.status(200).json({
        status: "success",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  // SEARCH USER
  static getAllUsers = (req, res, next) => {
    try {
      console.log("ddddddddddddddddd");
      let userName = req.query.username;

      if (userName) {
        userModel
          .find({
            name: { $regex: new RegExp("^" + userName + ".*", "i") },

            _id: { $ne: req.user._id },
          })
          // .find({ _id: { $ne: req.user._id } })
          .then((users) => {
            if (users.length > 0) {
              res.status(200).json({
                status: "success",
                users: users,
              });
            } else {
              res.status(404).json({
                status: "error",
                message: "no user found",
              });
            }
          })
          .catch((err) => {
            return next(err);
          });
      } else {
        res.status(422).json({
          status: "error",
          message: "plaese provide username",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "something went wrong while searching user",
      });
    }
  };

  static logout = async (req, res, next) => {
    console.log(req.body);
    // validation

    // const { error } = joiValidation.refreshTokenValidation(req.body);
    // if (error) {
    //   return next(error);
    // }
    try {
      // let isdeleted = await refreshTokenModel.deleteOne({
      //   refresh_token: req.body.refresh_token,
      // });
      // console.log(isdeleted);
    } catch (error) {
      return next(new Error("somthing went wrong in database"));
    }
    res.status(200).json({ status: "success", message: "successfully logout" });
  };
}

export default User;
