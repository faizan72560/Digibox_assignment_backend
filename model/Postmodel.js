const mongoose=require("mongoose")
const validator=require("validator")





const postSchema=new mongoose.Schema({

    name: {
        type: String,
        required:true
      },
      // description:{
      //   type:String,
      //   required:true


      // },
     
        price:{
          type: Number,
          required: true
        },
       
      image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
     
      createdAt: {
        type: Date,
        default: Date.now,
      },
  
    

})


module.exports = mongoose.model("Post12", postSchema);
