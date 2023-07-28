const { Staff } = require("../models/staffs_model");

// Controller function to get all staff members
const getAllStaff = async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching staff members." });
  }
};

// Controller function to create a new staff member
const createStaff = async (req, res) => {
  try {
    const { title, first_name, last_name, email } = req.body;
    const newStaffMember = await Staff.create({
      title,
      first_name,
      last_name,
      email,
    });
    res.json(newStaffMember);
  } catch (error) {
    res.status(500).json({ error: "Error creating a new staff member." });
  }
};

// Controller function to update a staff member by ID
const updateStaffById = async (req, res) => {
  try {
    const { title, first_name, last_name, email } = req.body;
    const staffId = req.params.id;
    const updatedStaffMember = await Staff.findByIdAndUpdate(
      staffId,
      { title, first_name, last_name, email },
      { new: true }
    );
    res.json(updatedStaffMember);
  } catch (error) {
    res.status(500).json({ error: "Error updating staff member." });
  }
};

// Controller function to delete a staff member by ID
const deleteStaffById = async (req, res) => {
  try {
    const staffId = req.params.id;
    await Staff.findByIdAndDelete(staffId);
    res.json({ message: "Staff member deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting staff member." });
  }
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaffById,
  deleteStaffById,
};
