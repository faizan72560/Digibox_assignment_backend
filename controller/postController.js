const Post = require("../model/Postmodel");
const express=require("express");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeature=require("../utils/apifeatures")
const { isAuthenticatedusers } = require("../middleware/auth");
const router=express.Router()
const cloudinary=require('cloudinary')
const Request=require("../model/Requestmodel")


exports.post=( async(req,res)=>{
    try{
        console.log(req.body)


        const {name,price}=req.body
        console.log(req.body)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "post",
            width: 150,
            crop: "scale",
          });
        
    const post= await Post.create(
        {
            name,
           
            price,
            image:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              },
        }
        )
        
        
        res.status(200).send({
            sucess:true,
            post
            
        })
    }catch(err){
        res.send({
            err:err

        })
        
    }
        
    })


exports.getpost=(async(req,res,next)=>{
    try{
        // console.log('products')
        const resultPerPage = 8;
        const postCount = await Post.countDocuments();
        // console.log(req.query)

        const apiFeature = new ApiFeature(Post.find(), req.query)
          .search()
          .filter();
      
        let post = await apiFeature.query;
        
         console.log('products')
        let filteredProductsCount = post.length;
      
      
        apiFeature.pagination(resultPerPage);
      
        post = await apiFeature.query.clone()
      
        res.status(200).json({
          success: true,
          post,
          postCount,
          resultPerPage,
          filteredProductsCount,
        });



    }
    catch(err){
        // res.json({
        //     err:err
        // })

        console.log(err)

    }

})


exports.getallpost=(async(req,res)=>{
    const post=await Post.find()
    // console.log(post)

    res.status(200).send({
        Success:true,
        post
    })
})


exports.getsinglepost=(async(req,res)=>{

    const id=req.params.id
     
    const post=await Post.findById(id)
    console.log(post)

    res.status(200).send({
        Success:true,
        post
    })


   
})

exports.request=( async(req,res)=>{
    try{
        console.log(req.body)


        const {product}=req.body
        console.log(req.body)
    
        
    const post= await Request.create(
        {
            product,
           
          
        }
        )
        
        
        res.status(200).send({
            sucess:true,
            post
            
        })
    }catch(err){
        res.send({
            err:err

        })
        
    }
        
    })
