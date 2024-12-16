const mongoose = require("mongoose");
const adminData = require("../schema/AdminData");
const jobData = require("../schema/JobData");
const applicationData = require("../schema/ApplicationData");

const fetchNotification = async (req, res) => {
    try {
        const jobExists = await jobData.find({});

        res.status(201).json({
            success: true,
            data: jobExists,
        });

    }
    catch (error) {
    console.log(error);
}
}

const application = async (req, res) => {
    try {
        const adminExists = await adminData.findOne({ ferm: req.body.ferm });

        if (adminExists) {
            const jobExists = await jobData.findOne({ refId: adminExists._id, role: req.body.role });

            res.status(201).json({
                success: true,
                data: adminExists,
                message: jobExists,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const submitForm = async (req, res) => {
    try {
        const ifExists = await applicationData.findOne(
            {
                refId: req.user.id,
                ferm: req.body.ferm,
                role: req.body.role,
            }
        );
        if (ifExists) {
            res.status(201).json("application already submitted");
        }
        else {
            const submittedForm = new applicationData({
                refId: req.user.id,
                ferm: req.body.ferm,
                name: req.user.name,
                role: req.body.role,
                email: req.user.email,
                imageUrl: req.body.imageUrl,
                document: req.body.document,
                pdfUrl: req.body.pdfUrl,
                yourself: req.body.yourself
            })
            const submitted = await submittedForm.save();

            res.status(201).json({
                success: true,
                message: "application submitted"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const fetchCandidates = async (req, res) => {
    try {
        const ifExists = await applicationData.find(
            {
                ferm: req.user.ferm,
                role: req.body.role,
            }
        );

        res.status(201).json({
            success: true,
            message: ifExists
        });

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { fetchNotification, application, submitForm, fetchCandidates }