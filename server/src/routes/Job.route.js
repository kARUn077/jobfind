const express = require('express');

const JobRoute = express.Router();

const { jobCreate } = require('../controller/Job.controller');
const authenticateUser = require('../middleware/auth.middleware');

JobRoute.post('/jobCreate', jobCreate);

module.exports = JobRoute ;