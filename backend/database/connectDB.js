import mongoose from "mongoose";

import { DATABASE_URL } from "../config/index.js";

const connectDB = async () => {
  try {
    const options = {
      //yhan hm database ka username or password b dety wo agyy dekhein gy
      // useNewURLParser: true,
      useUnifiedTopology: true,
      //useFindAndModify:false, // ye feild debracated chezon k  leye hoti hai but mujhy yhan error arha tha tbhi comment kr dey
      dbName: "Foodie",
    };

    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

    await mongoose.connect(DATABASE_URL, options);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
