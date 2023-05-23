import mongoose from "mongoose";

const options = {
  connectTimeoutMS: 200000,
  socketTimeoutMS: 2000000,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 4,
};
export const dbConnect = mongoose.connect(process.env.DB_URL, options).then((response) => {
  console.log("Database Connection has been established successfully.")
});
