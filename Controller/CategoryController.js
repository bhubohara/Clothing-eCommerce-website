import slugify from "slugify"
import categoryModel from "../Models/categoryModel.js"


export const createCategoryController= async(req,res)=>{

    try {
        const {name}=req.body
        if(!name){
            return res.status(401).send({
                message:'Name is required'
            })
        }
            const existingCategory = await categoryModel.findOne({name})
            if(existingCategory){
                res.status(200).send({
                    success:true,
                    message:'Category Already Exisits'

                })
            
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message: " New Category Created",
            category
        })
    } 
    
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in Category",
            error
        })
    }
}


//update category
export const updateCategoryController=async(req,res)=>{

    try {
        const {name}=req.body;
        const{id}= req.params

        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Category Upadate Succesfully',
            category
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update category',
            error
        })
        
    }

}

//category controller for list category

export const categoryController=async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All Category Lists',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Unable to get category list'
        })

    }
}


//get category by id

export const getCategoryByIdController=async(req,res)=>{
    try {
        const {id}= req.params;
        if(!id){
            res.status(404).send({
                success:false,
                message:'Category not found'
            })
        }

        const category = await categoryModel.findById(id);
        res.status(200).send({
            success:true,
            message:'Category fetch successfully',
            category
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:'Unable to get specific category'
        })
        
    }

}

//delete category

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}= req.params

        const category = await categoryModel.findByIdAndDelete(id);
        if(!id){
            res.status(404).send({
                success:true,
                message:'Unable to delete category'
            })
        }
        res.status(200).send({
            success:true,
            message:'Delete category successfully',
            category
        })
    } catch (error) {
        console.log(error)

        res.status(500).send({
            success:false,
            message:'Internal server error'
        })
        
    }
}