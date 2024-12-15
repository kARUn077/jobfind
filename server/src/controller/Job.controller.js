const mongoose = require("mongoose");
const jobData = require("../schema/JobData");

const jobCreate = async (req, res) => {
    try {
        const createdJob = new jobData({
            refId:req.user.id,
            gmail:req.user.gmail,
            role:req.body.role,
            eligibility:req.body.eligibility,
            skills:req.body.skills,
            salary:req.body.salary,
            lastDate:req.body.lastDate+"T"+req.body.lastTime+"Z",
            aboutUs:req.body.aboutus
        })
        const created = await createdJob.save();

        res.status(201).json({
            success: true,
            message: "job created"
        });
    }
    catch (error) {
        console.log(error);
    }
}

const fetchJob = async (req, res) => {
    try {
        const fetchJobData = await jobData.find({refId:req.user.id});
        res.status(201).json({
            success: true,
            message: fetchJobData,
        });
    }
    catch (error) {
        console.log(error);
    }
}

const deleteJob = async (req, res) => {
    try {
        const deleteJobData = await jobData.deleteOne({refId:req.user.id});
        res.status(201).json({
            success: true,
            data: "deleted job",
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { jobCreate, fetchJob, deleteJob }