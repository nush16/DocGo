const { Doctor } = require("../models/doctor_model");

// Controller to create a new doctor
const createDoctor = async (req, res) => {
  try {
    const { title, first_name, last_name, email } = req.body;

    // Create a new doctor object based on the Doctor model
    const newDoctor = new Doctor({
      title,
      first_name,
      last_name,
      email,
    });

    // Save the doctor to the database
    await newDoctor.save();

    return res
      .status(201)
      .json({ message: "Doctor created successfully", doctor: newDoctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    return res.json({ doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to get a single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Find the doctor by ID in the database
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    return res.json({ doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to update an existing doctor
const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { title, first_name, last_name, email } = req.body;

    // Find the doctor by ID in the database
    let doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Update the doctor properties
    doctor.title = title;
    doctor.first_name = first_name;
    doctor.last_name = last_name;
    doctor.email = email;

    // Save the updated doctor to the database
    doctor = await doctor.save();

    return res.json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to delete a doctor by ID
const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Find the doctor by ID in the database
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Delete the doctor from the database
    await doctor.remove();

    return res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
