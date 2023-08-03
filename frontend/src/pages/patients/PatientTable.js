// const initialRows = [
//   {
//     id: 1, // Unique identifier for the row
//     lastName: "Snow",
//     firstName: "Jon",
//     title: "Mr",
//     gender: "Male",
//     dateOfBirth: "1980-12-03",
//     email: "Jon.Snow@example.com",
//     phone: "555-1234",
//   },
//   {
//     id: 2, // Unique identifier for the row
//     lastName: "Harvey",
//     firstName: "Tom",
//     title: "Mr",
//     gender: "Male",
//     dateOfBirth: "1980-12-03",
//     email: "Tom.Harvey@example.com",
//     phone: "555-1234",
//   },
//   // Add more rows with 'email', 'phone', and 'nextAppointment' data
// ];

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const columns = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "firstName", headerName: "First Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
  { field: "gender", headerName: "Gender", width: 150 },
  { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "phone", headerName: "Phone", width: 180 },
];

export default function PatientTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tableData, setTableData] = React.useState([
    {
      id: 1, // Unique identifier for the row
      lastName: "Snow",
      firstName: "Jon",
      title: "Mr",
      gender: "Male",
      dateOfBirth: "1980-12-03",
      email: "Jon.Snow@example.com",
      phone: "555-1234",
    },
    {
      id: 2, // Unique identifier for the row
      lastName: "Harvey",
      firstName: "Tom",
      title: "Mr",
      gender: "Male",
      dateOfBirth: "1980-12-03",
      email: "Tom.Harvey@example.com",
      phone: "555-1234",
    },
    // Add more rows with 'email', 'phone', and 'nextAppointment' data
  ]);
  const [formData, setFormData] = React.useState({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Update the table data with the new row
    const newRow = { ...formData, id: tableData.length + 1 };
    setTableData([...tableData, newRow]);
    handleCloseModal();
    // Reset the form fields
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    });
  };

  const handleFormReset = () => {
    // Reset the form fields
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
      <Button variant="contained" onClick={handleOpenModal}>
        Add Patient
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4, // Rounded corners
            p: 4,
          }}
        >
          <h2 id="modal-title">Add Patient</h2>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Title"
              fullWidth
              sx={{ my: 1 }}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              label="First Name"
              fullWidth
              sx={{ my: 1 }}
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              sx={{ my: 1 }}
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <TextField
              label="Gender"
              fullWidth
              sx={{ my: 1 }}
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <TextField
              label="Date of Birth"
              fullWidth
              sx={{ my: 1 }}
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              sx={{ my: 1 }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              label="Phone"
              fullWidth
              sx={{ my: 1 }}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Button variant="contained" color="primary" type="submit">
              Save Patient
            </Button>{" "}
            <Button variant="contained" onClick={handleFormReset}>
              Reset
            </Button>{" "}
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
