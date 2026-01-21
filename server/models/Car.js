import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear()
    },

    category: {
      type: String,
      required: true,
      enum: ["SUV", "Sedan", "Hatchback", "Coupe", "Convertible", "Truck", "Van"]
    },

    seating_capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },

    fuel_type: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
    },

    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic", "Semi-Automatic"]
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
