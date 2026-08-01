const express = require('express')
const authRouter = express.Router();
const { middleWareFn } = require('../middleware/auth')
const { validateRequest } = require('../middleware/zod')
const { userValidation } = require('../zodSchemas/users')
const { login, register, getProfile, updateProfile, changePassword, deleteProfile } = require('../controllers/auth');
authRouter.post('/login', validateRequest(userValidation), login)
authRouter.post('/register', validateRequest(userValidation), register)
authRouter.get("/me", middleWareFn, getProfile);
authRouter.put("/me", validateRequest(userValidation), middleWareFn, updateProfile);
authRouter.put("/change-password", validateRequest(userValidation), middleWareFn, changePassword);
authRouter.delete("/me", middleWareFn, deleteProfile);
module.exports = { authRouter }