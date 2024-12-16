const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    refId:{
        type:String
    },
    email:{
        type:String
    },
    imageUrl:{
        type:String
    },
    document:{
        type:String
    },
    pdfUrl:{
        type:String
    },
    yourself:{
        type:String
    }
})

const applicationData = new mongoose.model("application", applicationSchema);

module.exports = applicationData; 