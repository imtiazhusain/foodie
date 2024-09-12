import userModel from "../models/User.model.js";

import CustomErrorHandler from "../middlewares/errors/customErrorHandler.js";
import bcrypt from "bcrypt";

import joiValidation from "../utils/joiValidation.js";
import generateJwtTokens from "../utils/generateJwtTokens.js";
import mongoose from "mongoose";
import HelperMethods from "../utils/helper.js";
import VerificationTokenModel from "../models/VerificationToken.model.js";
import EmailMethods from "../utils/email.js";
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

      const OTP = HelperMethods.generateOTP();
      const hashedOTP = await bcrypt.hash(OTP, 10);

      const verificationToken = new VerificationTokenModel({
        owner: registerUser._id,
        OTP: hashedOTP,
      });

      const tokenResult = await verificationToken.save();

      const result = await registerUser.save();
      EmailMethods.sendEmail(registerUser.email, "Email Verification", OTP);

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        user: {
          email: result.email,
          _id: result._id,
        },
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

  static verifyUser = async (req, res, next) => {
    try {
      const userID = req.body.userId;
      const OTP = req.body.OTP;
      // validation

      const { error } = joiValidation.verifyEmailValidation(req.body);

      if (error) {
        console.log(error.message);
        return next(error);
      }

      const isValidID = mongoose.Types.ObjectId.isValid(userID);
      if (!isValidID) {
        let error = {
          message: "Invalid user ID",
        };
        return next(error);
      }

      const user = await userModel.findById(userID);
      if (!user) {
        return next(CustomErrorHandler.notFound("User not Found"));
      }

      if (user.is_verified) {
        return res.status(403).json({
          status: "error",
          message: "This account is already verified",
        });
      }

      const token = await VerificationTokenModel.findOne({ owner: user._id });

      if (!token) {
        return next(CustomErrorHandler.notFound("No token found"));
      }

      const isMatched = await token.compareToken(OTP);

      if (!isMatched) {
        return res.status(422).json({
          status: "error",
          message: "Please provide a valid token!",
        });
      }
      user.is_verified = true;

      await VerificationTokenModel.findByIdAndDelete(token._id);
      await user.save();

      EmailMethods.sendEmail(
        user.email,
        "success message",
        "Email verified successfully"
      );

      return res.status(200).json({
        status: "success",
        message: "Account verified",
      });
    } catch (error) {
      console.log(error);

      return next(error);
    }
  };

  static sendOTP = async (req, res, next) => {
    try {
      const userEmail = req.body.userEmail;
      const userId = req.body.userId;

      let obj = {
        userEmail,
        userId,
      };

      // validation
      const { error } = joiValidation.sendOTPValidation(obj);

      if (error) {
        console.log(error.message);
        return next(error);
      }

      const isValidID = mongoose.Types.ObjectId.isValid(userId);

      if (!isValidID) {
        let error = {
          message: "Invalid user ID",
        };
        return next(error);
      }

      const user = await userModel.findOne({ email: userEmail });
      if (!user) {
        return next(CustomErrorHandler.notFound("No user found"));
      }

      if (user.is_verified) {
        return res.status(403).json({
          status: "error",
          message: "This Account is already verified",
        });
      }

      const OTP = HelperMethods.generateOTP();

      const exist = await VerificationTokenModel.exists({ owner: userId });
      if (exist) {
        const result = await VerificationTokenModel.deleteOne({
          owner: userId,
        });
      }

      const hashedOTP = await bcrypt.hash(OTP, 10);

      const verificationToken = new VerificationTokenModel({
        owner: userId,
        OTP: hashedOTP,
      });

      const tokenResult = await verificationToken.save();
      EmailMethods.sendEmail(userEmail, "Email Verification", OTP);

      return res.status(200).json({
        status: "success",
        message: "Please verify your email",
        user: {
          email: userEmail,
          user_id: userId,
        },
      });
    } catch (error) {
      console.log(error);

      return next(error);
    }
  };

  static logout = async (req, res, next) => {
    try {
    } catch (error) {
      return next(new Error("something went wrong in database"));
    }
    res.status(200).json({ status: "success", message: "successfully logout" });
  };
}

export default User;
