// import mongoose from "mongoose";

// const connectDB = async ()=>{
//     try {
//         mongoose.connection.on('connected', ()=> console.log("Database Connected")
//         );
//         await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)
//     } catch (error) {
//         console.error(error.message);
//     }
// }


// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");

    // Log what URI you are trying to connect to
    console.log("Mongo URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "greencart",           // <--- IMPORTANT FIX
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("🔥 MongoDB Connected Successfully");
    });

  } catch (error) {
    console.log("❌ MongoDB Connection Error:");
    console.log(error);
  }
};

export default connectDB;
