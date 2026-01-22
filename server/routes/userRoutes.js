import express from 'express';
<<<<<<< HEAD
import { getUserData, LoginUser, registerUser } from '../controllers/userController.js';
=======
import { getCars, getUserData, LoginUser, registerUser } from '../controllers/userController.js';
>>>>>>> 5933b73 (Made my updates after re-downloading the repo)
import { protect } from '../middlewear/auth.js';

const userRouter= express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)
userRouter.get('/data',protect,getUserData)
<<<<<<< HEAD
=======
userRouter.get('/cars',getCars)
>>>>>>> 5933b73 (Made my updates after re-downloading the repo)

export default userRouter;