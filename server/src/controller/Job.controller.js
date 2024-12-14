const mongoose = require("mongoose");
const jobData = require("../schema/JobData");
const jwt = require("jsonwebtoken");

const jobCreate = async (req, res) => {
    try {
        const jobCreate = await jobData.create({
            role: req.body.role,
            eligibility: req.body.eligibility,
            lastDate: req.body.lastDate
        })
        //const jobCreated = await jobCreate.save();

        res.status(201).json({
            success: true,
            message: "job created"
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { jobCreate }