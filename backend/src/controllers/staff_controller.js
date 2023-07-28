const { Staff } = require("../models/staffs_model");

// Controller function to get all staff members
const getAllStaff = async (request, response) => {
  try {
    const staffMembers = await Staff.find();
    response.json(staffMembers);
  } catch (error) {
    response.status(500).json({ error: "Error fetching staff members." });
  }
};

// Controller function to create a new staff member
const createStaff = async (request, response) => {
  try {
    const { title, first_name, last_name, email } = request.body;
    const newStaffMember = await Staff.create({
      title,
      first_name,
      last_name,
      email,
    });
    response.json(newStaffMember);
  } catch (error) {
    response.status(500).json({ error: "Error creating a new staff member." });
  }
};

// Controller function to update a staff member by ID
const updateStaffById = async (request, response) => {
  try {
    const { title, first_name, last_name, email } = request.body;
    const staffId = request.params.id;
    const updatedStaffMember = await Staff.findByIdAndUpdate(
      staffId,
      { title, first_name, last_name, email },
      { new: true }
    );
    response.json(updatedStaffMember);
  } catch (error) {
    response.status(500).json({ error: "Error updating staff member." });
  }
};

// Controller function to delete a staff member by ID
const deleteStaffById = async (request, response) => {
  try {
    const staffId = request.params.id;
    await Staff.findByIdAndDelete(staffId);
    response.json({ message: "Staff member deleted successfully." });
  } catch (error) {
    response.status(500).json({ error: "Error deleting staff member." });
  }
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaffById,
  deleteStaffById,
};
