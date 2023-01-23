const mongoose=require("mongoose")
const validator=require("validator")





const RequestSchema=new mongoose.Schema({

    product: {
        type: String,
        required:true
      },

     
     
     
       
     
      createdAt: {
        type: Date,
        default: Date.now,
      },
  
    

})


module.exports = mongoose.model("Request12", RequestSchema);
