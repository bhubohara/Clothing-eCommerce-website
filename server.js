import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import DbConnection from "./Config/db.js";
import authRouter from "./Routes/authRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cors from "cors";

// Configure env
dotenv.config();

//db connection

DbConnection();

const app = express();

// app.get('/', (req, res) => {
//     res.send("welcome to home page")
// })

//midleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Welcome to ecommerce website </h2>");
});

const PORTs = process.env.PORT;
console.log("process.env.PORT:", process.env.PORT);

app.listen(PORTs, () => {
  console.log("server is running on port:", `${PORTs}`);
});
