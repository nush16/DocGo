import React, { useState, useEffect, useContext} from "react";
import { AuthContext } from '../../AuthContext';
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from '../../axiosConfig';


function formatDateToISO(dob) {
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const { token } = useContext(AuthContext);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [operation, setOperation] = useState("");
  const [dialogData, setDialogData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
  });

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "dob",
      headerName: "Birth Date",
      width: 100,
      valueGetter: (params) => formatDateToISO(params.value),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setDialogData({ 
            ...params.row,
            dob: formatDateToISO(params.row.dob)

          });
          setOperation("update");
          setDialogOpen(true);
        };

        return (
          <UpdateIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={onClick}
          />
        );
      },
    },
    {
      field: "delete",
      headerName: "Remove",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setIdToDelete(params.id);
          setDeleteDialogOpen(true);
        };

        return (
          <DeleteIcon
            color="error"
            style={{ cursor: "pointer" }}
            onClick={onClick}
          />
        );
      },
    },
  ];

  const backendURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URL_DEV : process.env.REACT_APP_BACKEND_URL_PROD;

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${backendURL}/patients/${idToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token as a header
        }
      });
      if (response.data.message === 'Patient deleted successfully') {
        setRows(rows.filter((row) => row.id !== idToDelete));
        setIdToDelete(null);
        setDeleteDialogOpen(false);
      } else {
        console.error('Failed to delete user: ', response.data.error);
      }
    } catch (error) {
      console.error('Failed to delete user: ', error);
    }
  };

  const openAddDialog = () => {
    setDialogData({
      title: "",
      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
    });
    setOperation("add");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Saving Created/Updated user to database
  const handleDialogSubmit = async () => {
    
    // Validate data before sending it
    if (!dialogData.email || !dialogData.first_name || !dialogData.last_name || !dialogData.title || !dialogData.gender || !dialogData.dob || !dialogData.phone) {
      alert("All fields must be filled!");
      return;
    } 
    // Check if email already exists in the current rows
    if (operation === "add" && rows.find(row => row.email === dialogData.email)) {
      alert("Email already exists!");
      return;
    }
    try {
      if (operation === "update") {
        const response = await axios.put(`${backendURL}/patients/${dialogData.id}`, dialogData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedPatient = { ...response.data, id: response.data._id, dob: new Date(response.data.dob) };
        setRows(rows.map((row) => (row.id === updatedPatient.id ? updatedPatient : row)));
        alert("Patient details updated successfully.");
  
      } else {
        // add operation
        const response = await axios.post(`${backendURL}/patients`, dialogData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Server response:', response.data);
        const newPatientId = response.data.patient._id;      
        const newPatient = { ...response.data, id: response.data.patient._id};
        setRows([...rows, newPatient]);
        alert("Patient added successfully.");       
      }
      setOperation("");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };


  // Get all patients from database and show in the table
  useEffect(() => {
    // Function to fetch all users from the backend
    const fetchPatients = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token as a header
          },
        };

        // Get the data from the backend
        const response = await axios.get(`${backendURL}/patients`, config);
        // Map the response data to match the table's row data structure
        const PatientData = response.data.map(patient => {
          if (patient && patient._id) {
            return {
              id: patient._id,
              email: patient.email,
              title: patient.title,
              first_name: patient.first_name,
              last_name: patient.last_name,
              gender: patient.gender,
              dob: patient.dob,
              phone: patient.phone,
            };
          } else {
            console.error('Unexpected patient object:', patient);
            return null;
          }
        }).filter(Boolean); // Filter out null values

        setRows(PatientData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchPatients(); // Call the function
  }, [token]);  // Depend on the token  

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection);
        }}
      />
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: 10 }}
          onClick={openAddDialog}
        >
          Add Patient
        </Button>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {operation.charAt(0).toUpperCase() + operation.slice(1)} Patient
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            value={dialogData.title}
            onChange={(e) =>
              setDialogData({ ...dialogData, title: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="First Name"
            value={dialogData.first_name}
            onChange={(e) =>
              setDialogData({ ...dialogData, first_name: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            value={dialogData.last_name}
            onChange={(e) =>
              setDialogData({ ...dialogData, last_name: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Gender"
            value={dialogData.gender}
            onChange={(e) =>
              setDialogData({ ...dialogData, gender: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="DOB"
            type="date"
            value={dialogData.dob}
            onChange={(e) =>
              setDialogData({ ...dialogData, dob: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            value={dialogData.email}
            onChange={(e) =>
              setDialogData({ ...dialogData, email: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            value={dialogData.phone}
            onChange={(e) =>
              setDialogData({ ...dialogData, phone: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            {dialogData.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;