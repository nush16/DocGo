// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
// import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// const ResetButtonStyled = styled(Button)(({ theme }) => ({
//   marginLeft: theme.spacing(4.5),
//   [theme.breakpoints.down("sm")]: {
//     width: "100%",
//     marginLeft: 0,
//     textAlign: "center",
//     marginTop: theme.spacing(4),
//   },
// }));

const AddStaffDetails = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true);
  const [imgSrc, setImgSrc] = useState("/images/avatars/1.png");

  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Title"
              placeholder="Dr"
              defaultValue="Dr"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="First Name"
              placeholder="John"
              defaultValue="John"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Last Name"
              placeholder="Doe"
              defaultValue="Doe"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder="johnDoe@example.com"
              defaultValue="johnDoe@example.com"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="Contact Number"
              label="Contact Number"
              placeholder="12345678"
              defaultValue="12345678"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Clinic"
              placeholder="ABC"
              defaultValue="ABC"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default AddStaffDetails;
