import React, { useState, useEffect, useContext } from "react";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from '../../axiosConfig';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const { token, isAdmin } = useContext(AuthContext); 
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [operation, setOperation] = useState("");
  const [dialogData, setDialogData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    title: "",
    isAdministrator: false,
    isPractitioner: false,
  });

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "title", headerName: "Title", width: 150 },    
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    {
      field: "isAdministrator",
      headerName: "Administrator",
      width: 150,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
    {
      field: "isPractitioner",
      headerName: "Practitioner",
      width: 150,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
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

  const backendURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URL_DEV : process.env.REACT_APP_BACKEND_URL_PROD;
  console.log(backendURL)

  useEffect(() => {
    // Function to fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token as a header
          },
        };

        // Get the data from the backend
        const response = await axios.get(`${backendURL}/users`, config);
        
        // Map the response data to match the table's row data structure
        const userData = response.data.map(user => ({
          id: user._id,
          email: user.email,
          title: user.title,
          first_name: user.first_name,
          last_name: user.last_name,
          isAdministrator: user.isAdministrator,
          isPractitioner: user.isPractitioner
        }));

        setRows(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the function
  }, [token]);  // Depend on the token  

  const onClick = (params) => {
    setIdToDelete(params.id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${backendURL}/users/${idToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token as a header
        }
      });
      if (response.data.message === 'User deleted successfully.') {
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
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      title: "",
      isAdministrator: false,
      isPractitioner: false,
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


  const savePatient = async () => {
    try {
      if (operation === "update") {
        // update logic here...
      } else {
        const response = await axios.post("${backendURL}/users", dialogData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newUser = response.data.user;
        setRows([...rows, newUser]);
      }
      setOperation("");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
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
          Add STAFF
        </Button>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {operation.charAt(0).toUpperCase() + operation.slice(1)} Staff
        </DialogTitle>
        <DialogContent>
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
            label="Title"
            value={dialogData.title}
            onChange={(e) =>
              setDialogData({ ...dialogData, title: e.target.value })
            }
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dialogData.isAdministrator}
                onChange={(e) =>
                  setDialogData({ ...dialogData, isAdministrator: e.target.checked })
                }
                color="primary"
              />
            }
            label="Administrator"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dialogData.isPractitioner}
                onChange={(e) =>
                  setDialogData({ ...dialogData, isPractitioner: e.target.checked })
                }
                color="primary"
              />
            }
            label="Practitioner"
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