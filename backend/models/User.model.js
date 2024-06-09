import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: {
    type: String,
    default:
      ' "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",',
  },
  is_verified: { type: Boolean, default: false },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
