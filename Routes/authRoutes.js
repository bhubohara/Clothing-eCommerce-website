import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  UpdateStatusOrdersController,
  UpdatePaymentOrdersController,
} from "../Controller/authController/registerController.js";

import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

//couter object
const router = express.Router();

//routing

//Register// Method post

router.post("/register", registerController);

//Login //Post Method

router.post("/login", loginController);

//test routes

router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth/dashboard

router.get("/userAuth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admim procted route auth/dashboard

router.get("/adminAuth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot password

router.post("/forgotPassword", forgotPasswordController);

//profile update

router.put("/profileUpdate", requireSignIn, updateProfileController);

//order route

router.get("/userOrders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  UpdateStatusOrdersController
);

//payment status update
router.put(
  "/order-payment/:orderId",
  requireSignIn,
  isAdmin,
  UpdatePaymentOrdersController
);

export default router;
