import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../../Helpers/authHelper.js";
import userModel from "../../Models/userModels.js";
import orderModel from "../../Models/orderModel.js";

import Jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer number is required" });
    }
    // user check
    const exisitingUser = await userModel.findOne({
      email: email,
    });
    // existing user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User already register please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    //save

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration of User",
      error,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: " Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};

//forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check

    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Worng Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findOneAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//test controller

export const testController = (req, res) => {
  res.send("protected route");
};

//profile update of user
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);

    // Password validation
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Update user fields
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password, // Ensure the hashed password is used here
        phone: phone || user.phone,
        address: address || user.address,
        email: email || user.email,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating the profile",
      error: error.message, // Provide more specific error details
    });
  }
};

//orders

export const getOrdersController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all orders for the specified user
    const orders = await orderModel
      .find({ buyer: userId })
      .populate("products", "-photo") // Assuming "products" is the array of products in your order schema
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "order fetch suceessfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    // Fetch all orders for the specified user
    const orders = await orderModel
      .find({})
      .populate("products", "-photo") //
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "order fetch suceessfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const UpdateStatusOrdersController = async (req, res) => {
  try {
    // Fetch all orders for the specified user
    const { orderId } = req.params;
    const { status } = req.body;
    const ordersStatus = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "order fetch suceessfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Payment status Update

export const UpdatePaymentOrdersController = async (req, res) => {
  try {
    // Fetch all orders for the specified user
    const { orderId } = req.params;
    const { payment } = req.body;
    const paymentStatus = await orderModel.findByIdAndUpdate(
      orderId,
      { payment },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "order fetch suceessfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
