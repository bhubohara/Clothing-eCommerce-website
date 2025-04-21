import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  cashOnDeliveryController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductByIdController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  realatedProductController,
  searchProductController,
  updateProductController,
} from "../Controller/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Update products
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//getProducts

router.get("/getProducts", getProductController);

//single product

router.get("/getProductBySlug/:slug", getSingleProductByIdController);

//get Photo

router.get("/product-photo/:pid", getProductPhotoController);

// delete product

router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product
router.post("/product-filter", productFilterController);

//product count

router.get("/product-count", productCountController);

//product per page

router.get("/product-list/:page", productListController);

//search product
router.get("/product-search/:keyword", searchProductController);

//Similar product

router.get("/related-product/:pid/:cid", realatedProductController);

//category wise product

router.get("/product-category/:slug", productCategoryController);

//payment route

router.get("/braintree/token", braintreeTokenController);

//payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

//cashon delivery

router.post("/casOnDelivery", requireSignIn, cashOnDeliveryController);

export default router;
