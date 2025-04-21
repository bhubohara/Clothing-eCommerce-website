import express from 'express'
import {requireSignIn,isAdmin} from '../Middlewares/authMiddleware.js'
import { 
    categoryController, createCategoryController, deleteCategoryController, getCategoryByIdController, updateCategoryController
 } from '../Controller/CategoryController.js'

const router = express.Router()

// routes

//create category
router.post('/create-category', requireSignIn,isAdmin, createCategoryController
)

//update category

router.put('/update-category/:id', requireSignIn,isAdmin, updateCategoryController)

// Get category by Id

router.get('/Get-categoryById/:id', getCategoryByIdController)

//get all  category

router.get('/categoryList',categoryController)
// getByid category List


//delete category

router.delete('/deleteCategory/:id',requireSignIn,isAdmin, deleteCategoryController)
export default router