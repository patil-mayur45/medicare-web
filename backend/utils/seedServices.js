require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Service = require("../models/Service");

const services = [
  {
    title: "General Checkup",
    description: "Comprehensive health screening with our experienced general physicians.",
    icon: "FaStethoscope",
  },
  {
    title: "Cardiology",
    description: "Expert heart care including ECG, stress tests, and consultations.",
    icon: "FaHeartbeat",
  },
  {
    title: "Pediatrics",
    description: "Gentle, specialized care for infants, children, and adolescents.",
    icon: "FaBaby",
  },
  {
    title: "Dermatology",
    description: "Skin, hair, and nail treatments from certified dermatologists.",
    icon: "FaAllergies",
  },
  {
    title: "Orthopedics",
    description: "Diagnosis and treatment of bone, joint, and muscle conditions.",
    icon: "FaBone",
  },
  {
    title: "Dental Care",
    description: "Full range of dental services from cleanings to cosmetic dentistry.",
    icon: "FaTooth",
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log("Services seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
