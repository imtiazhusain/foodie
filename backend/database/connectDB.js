import mongoose from "mongoose";

import { DATABASE_URL } from "../config/index.js";

const connectDB = async () => {
  try {
    const options = {
      //yhan hm database ka username or password b dety wo agyy dekhein gy
      // useNewURLParser: true,
      useUnifiedTopology: true,
      //useFindAndModify:false, // ye feild debracated chezon k  leye hoti hai but mujhy yhan error arha tha tbhi comment kr dey
      dbName: "Chat_App",
    };

    await mongoose.connect(DATABASE_URL, options);

    console.log("Database connected...");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
