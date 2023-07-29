import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const AppointmentForm = ({ onSubmit, initialValues = {} }) => {
  const [appointmentData, setAppointmentData] = React.useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(appointmentData);
  };

  const handleChange = (event) => {
    setAppointmentData({
      ...appointmentData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="practitioner"
            label="Practitioner"
            value={appointmentData.practitioner || ''}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="type"
            label="Type"
            value={appointmentData.type || ''}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="patient"
            label="Patient"
            value={appointmentData.patient || ''}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AppointmentForm;
