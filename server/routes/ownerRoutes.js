import express from "express";
import { protect } from "../middlewear/auth.js";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability } from "../controllers/ownerController.js";
import upload from "../middlewear/multer.js";

const ownerRouter =express.Router();

ownerRouter.post("/change-role",protect,changeRoleToOwner)
ownerRouter.post("/add-car",upload.single('image'),protect,addCar)
ownerRouter.post("/cars",protect,getOwnerCars)
ownerRouter.post("/toggle-car",protect,toggleCarAvailability)
ownerRouter.post("/delete-car",protect,deleteCar)
ownerRouter.get("/dashboard",protect,getDashboardData)
export default ownerRouter