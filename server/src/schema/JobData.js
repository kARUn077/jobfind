const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    role:{
        type:String
    },
    eligibility:{
        type:String
    },
    lastDate:{
        type:Date
    },
})

const jobData = new mongoose.model("job",jobSchema);

module.exports = jobData; 