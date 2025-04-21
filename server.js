import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import DbConnection from "./Config/db.js";
import authRouter from "./Routes/authRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cors from "cors";
import Path from "path";
import path from "path";
import {fileURLToPath} from 'url'

// Configure env
dotenv.config();

//db connection

DbConnection();

// es6 module fix

const __filename=fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// app.get('/', (req, res) => {
//     res.send("welcome to home page")
// })

//midleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./build")));

//Routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//client build route

app.use("*", function (req, res) {
  res.sendFile(path.join("./build/index.html"));
});

const PORTs = process.env.PORT;
console.log("process.env.PORT:", process.env.PORT);

app.listen(PORTs, () => {
  console.log("server is running on port:", `${PORTs}`);
});