import React, { useState } from "react";
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
import axios from "axios"; // Add axios library

const initialData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
  },
];

function formatDate(dob) {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

const DataTable = () => {
  const [rows, setRows] = useState(initialData);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [operation, setOperation] = useState("");
  const [dialogData, setDialogData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const columns = [
    { field: "id", hide: true, width: 50 },
    { field: "firstName", headerName: "First Name", width: 250 },
    { field: "lastName", headerName: "Last Name", width: 250 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 250 },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setDialogData({ ...params.row });
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

  const onClick = (params) => {
    setIdToDelete(params.id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== idToDelete));
    setIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const openAddDialog = () => {
    setDialogData({
      title: "",
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
    });
    setOperation("add");
    setDialogOpen(true);
  };

  const openUpdateDialog = () => {
    if (selectionModel.length > 0) {
      const firstSelectedRow = rows.find((row) => row.id === selectionModel[0]);
      setDialogData({ ...firstSelectedRow });
      setOperation("update");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    if (operation === "update") {
      setRows(rows.map((row) => (row.id === dialogData.id ? dialogData : row)));
    } else {
      const id = rows.length ? rows[rows.length - 1].id + 1 : 1;
      setRows([...rows, { id, ...dialogData }]);
    }
    setOperation("");
    setDialogOpen(false);
  };

  //   const deleteData = () => {
  //     setRows(rows.filter((row) => !selectionModel.includes(row.id)));
  //   };

  // Function to create/update a patient using API
  const savePatient = async () => {
    try {
      if (operation === "update") {
        await axios.put(`/api/users/${dialogData.id}`, dialogData);
        setRows(
          rows.map((row) => (row.id === dialogData.id ? dialogData : row))
        );
      } else {
        const response = await axios.post("/api/users", dialogData);
        const newPatient = response.data;
        setRows([...rows, newPatient]);
      }
      setOperation("");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  // Function to delete patient(s) using API
  const deleteData = async () => {
    try {
      const response = await axios.delete("/api/users", {
        data: { ids: selectionModel }, // Assuming you want to delete multiple patients at once
      });
      if (response.data.success) {
        setRows(rows.filter((row) => !selectionModel.includes(row.id)));
        setSelectionModel([]);
      }
    } catch (error) {
      console.error("Error deleting staff(s):", error);
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
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
          {operation.charAt(0).toUpperCase() + operation.slice(1)} Staff
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            value={dialogData.firstName}
            onChange={(e) =>
              setDialogData({ ...dialogData, firstName: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            value={dialogData.lastName}
            onChange={(e) =>
              setDialogData({ ...dialogData, lastName: e.target.value })
            }
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
