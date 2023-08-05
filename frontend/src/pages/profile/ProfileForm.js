import React, { useState, useEffect, useContext } from 'react'; // Add useContext
import { AuthContext } from '../../AuthContext';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from '../../axiosConfig';

const backendURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URL_DEV : process.env.REACT_APP_BACKEND_URL_PROD;

const ProfileForm = () => {
  const { token, userId } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState(true);
  const [imgSrc, setImgSrc] = useState("/images/avatars/1.png");
  const [user, setUser] = useState({});  // This holds the user data
  const [newPassword, setNewPassword] = useState("");

    const handleChange = (e) => {
      setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    if (userId) {
      axios.get(`${backendURL}/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setUser(response.data);  // Set the user data here
      })
      .catch(error => {
        console.log('Error getting user details:', error);
      });
    }
  }, [userId, token]);

  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

    // Function to handle user details update
    const handleUserDetailsUpdate = (e) => {
      e.preventDefault();

      // Check if any field is empty
      const { title, first_name, last_name, email } = user;
      if (!title || !first_name || !last_name || !email) {
        alert("Please fill all the fields.");
        return;
      }
      axios.put(`${backendURL}/users/${userId}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          alert("User details updated successfully.");
          // Update the user data with the updated data
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error updating user details:', error);
          if (error.response && error.response.data.error === 'Email already in use.') {
            alert('Email already in use. Please use a different email.');
          } else {
            alert('Error updating user details.');
          }
        });
    };
  
    // Function to handle password change
    const handlePasswordChange = (newPassword) => {
      // Don't proceed if newPassword is empty
      if (!newPassword) {
        alert("Password cannot be empty.");
        return;
      }
      
      // Validation for password length
      if(newPassword.length < 8){
        alert("Password must be at least 8 characters long.");
        return;
      }

      axios.put(`${backendURL}/users/${userId}/password`, { newPassword }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          alert("Password changed successfully.");
        })
        .catch(error => {
          console.error('Error changing password:', error);
          alert('Error changing password.');
        });
    };
  

  return (
    <CardContent>
      <form onSubmit={handleUserDetailsUpdate}> {/* Add onSubmit handler */}
        <Grid container spacing={5}>
          <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Title"
            placeholder=""
            value={user.title}
            name="title"  // add this line
            onChange={handleChange} // add this line
            InputLabelProps={{ shrink: true }}
          />
          </Grid>
          <Grid item xs={12} sm={5}>
          <TextField
              fullWidth
              label="First Name"
              placeholder=""
              value={user.first_name}
              name="first_name"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Last Name"
              placeholder=""
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder=""
              name="email"
              value={user.email}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Change Password"
              placeholder="********"
              type="password" // Make sure to set the type to password
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <Button 
              variant="contained" 
              onClick={() => handlePasswordChange(newPassword)}
              sx={{
                  marginTop: 1,
              }}
            >
              Change Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }} onClick={handleUserDetailsUpdate}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default ProfileForm;
