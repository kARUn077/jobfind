const express = require('express');

const AdminRoute = express.Router();

const { adminRegister, adminLogin, verifyToken, fetchAdmin, updateAdmin } = require('../controller/Admin.controller');
const authenticateUser = require('../middleware/auth');

AdminRoute.post('/adminRegister', adminRegister);
AdminRoute.post('/adminLogin', adminLogin);
AdminRoute.post('/verifyToken',authenticateUser,verifyToken);
AdminRoute.get('/fetchAdmin', authenticateUser, fetchAdmin);
AdminRoute.post('/updateAdmin', authenticateUser, updateAdmin);

module.exports = AdminRoute ;