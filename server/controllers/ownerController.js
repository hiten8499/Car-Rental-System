import fs from "fs";
import path from "path";
import imagekit from "../configs/imagekit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

// ==============================
// Change user role to OWNER
// ==============================
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({
      success: true,
      message: "Now you can list cars"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==============================
// Add / List a Car
// ==============================
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    // Parse car data
    const carData = JSON.parse(req.body.carData);

    // Uploaded image
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Car image is required"
      });
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars"
    });

    // Remove temp file
    fs.unlinkSync(imageFile.path);

    // Optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" }
      ]
    });

    // Save car in DB
    await Car.create({
  owner: req.user._id,
  brand: carData.brand,
  model: carData.model,
  image: imageUrl,
  year: Number(carData.year),
  category: carData.category,
  seating_capacity: Number(carData.seating_capacity),
  fuel_type: carData.fuel_type,
  transmission: carData.transmission,
  pricePerDay: Number(carData.pricePerDay),
  location: carData.location,
  description: carData.description,
  isAvailable: true

});


    res.status(201).json({success: true,message: "Car listed successfully"});
  }
   catch (error) {
    console.error(error.message);
    res.status(500).json({success: false,message: error.message});
  }
};

//API to list Owner cars 

export const getOwnerCars = async(req,res)=>{
  try {
    const { _id } = req.user;  
    const cars =await Car.find({owner:_id}) 
    res.json({success:true,cars})
  }
    catch (error) { 
    console.error(error.message);
    res.status(500).json({success: false,message: error.message});
    }
}

//Api to Toggle car availability
export const toggleCarAvailability = async(req,res)=>{
  try {
    const { _id } = req.user;  
    const {carId}=req.body
    const car =await Car.findById({carId})
    
      if(car.owner.toString()!==_id.toString()){
        return res.json({success:false,message:"Unauthorized Action"})
      }
     
       car.isAvailable =!car.isAvailable
       await car.save()

    res.json({success:true,message:"Availability status changed successfully"})
  }
    catch (error) { 
    console.error(error.message);
    res.status(500).json({success: false,message: error.message});
    }
} 

//API to delete a car
export const deleteCar = async(req,res)=>{
  try {
    const { _id } = req.user;  
    const {carId}=req.body
    const car =await Car.findById({carId})
    
      if(car.owner.toString()!==_id.toString()){
        return res.json({success:false,message:"Unauthorized Action"})
      }
     
       car.owner = null
       car.isAvailable =false
       await car.save()

    res.json({success:true,message:"Car Removed"})
  }
    catch (error) { 
    console.error(error.message);
    res.status(500).json({success: false,message: error.message});
    }
} 

//API to get Dashboard Data
export const getDashboardData = async(req,res)=>{
    try {  
    const { _id } = req.user;
    if(role!=="owner")
        {
        return res.json({success:false,message:"Unauthorized Access"})    
       }
       const cars=await Car.find({owner:_id})
       const bookings=await Booking.find({owner:_id}).populate('car').toSorted({createdAt:-1})
       const pendingBookings=await Booking.find({owner:_id,status:"pending"})
       const competedBookings=await Booking.find({owner:_id,status:"confirmed"})

       //Monthly Revenue

       const monthlyRevenue =bookings.slice().filter(booking=>booking.status==='confirmed').
       reduce((acc,booking)=>acc+booking.price,0)

       const dashboardData={
        totalCars:cars.length,
        totalBookingds:bookings.length,
        pendingBookings:pendingBookings.length,
        completedBookings:completedBookings.length,
        recentBookings:bookings.slice(0,3),
        monthlyRevenue
       }
        res.json({success:true,dashboardData});
}
    catch (error) { 
    console.error(error.message);
    res.json({success: false,message: error.message});
    }
}

