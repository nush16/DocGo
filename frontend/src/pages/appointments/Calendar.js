import React, { useState, useEffect, useContext} from "react";
import { AuthContext } from '../../AuthContext';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button, Modal as MuiModal, TextField, MenuItem, Autocomplete, } from "@mui/material";
import { Box } from "@mui/system";
import axios from '../../axiosConfig';

const localizer = momentLocalizer(moment);

//Event Format Functionality
const AppointmentEvent = ({ event }) => (
  <span>
    <strong>{formatEventTitle(event)}</strong>
    <br />
    <em>{event.doctor}</em>
  </span>
);

const formatEventTitle = (event) => {
  return `${event.type}: ${event.patient}`;
};


const AppointmentCalendar = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const { token } = useContext(AuthContext);
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAddAppointmentModalOpen, setAddAppointmentModalOpen] =
    useState(false);
  const [appointmentType, setAppointmentType] = useState("");

  const backendURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URL_DEV : process.env.REACT_APP_BACKEND_URL_PROD;

  const handleCellClick = (event) => {
    setSelectedAppointment(event);
    setEditedAppointment({ ...event });
  };

// Function to fetch patients
const fetchPatients = async () => {
  try {
    const response = await axios.get(`${backendURL}/patients`, { headers: { Authorization: `Bearer ${token}` } });
    setPatients(response.data);
  } catch (error) {
    console.error("Failed to fetch patients:", error);
  }
};

  //Load Appointments from the Server
  useEffect(() => {
    fetchPatients();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the JWT token as a header
      },
    };
  
    axios.get(`${backendURL}/appointment`, config)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, [token]);  // Depend on the token  

  useEffect(() => {
    setCalendarKey((prevKey) => prevKey + 1);
  }, [appointments]);


  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setEditedAppointment(null);
    setErrorMessage(null); // Reset the error message
    setAddAppointmentModalOpen(false); // Set the state to false to close the modal
  };

  const setError = (message) => {
    setErrorMessage(message);
  };

  const handleDelete = () => {
    if (editedAppointment && editedAppointment.id) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== editedAppointment.id
        )
      );
      handleCloseModal();
    }
  };

  const handleSubmit = () => {
    // Check if the appointment start and end times are within working hours (8am to 5pm)
    const startHour = editedAppointment.start.getHours();
    const endHour = editedAppointment.end.getHours();
    const isWithinWorkingHours = startHour >= 8 && endHour <= 17;

    if (!isWithinWorkingHours) {
      setError("Appointments can only be booked between 8am and 5pm.");
      return;
    }

    if (editedAppointment && editedAppointment.id) {
      setAppointments((prevAppointments) => {
        const updatedAppointments = prevAppointments.map((appointment) =>
          appointment.id === editedAppointment.id
            ? editedAppointment
            : appointment
        );
        return updatedAppointments;
      });
    } else {
      // This is a new appointment, so add it to the list with the appointment type
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        { ...editedAppointment, id: Date.now(), type: appointmentType }, // Include the appointment type
      ]);
    }

    handleCloseModal();
    setAddAppointmentModalOpen(false);
  };

  const handleFormChange = (field, value) => {
    setEditedAppointment((prevAppointment) => ({
      ...prevAppointment,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setEditedAppointment(selectedAppointment);
  };

  const handleAddAppointment = () => {
    // Set the editedAppointment state to a new empty appointment object
    const newAppointment = {
      id: null,
      title: "",
      start: new Date(),
      end: new Date(),
      patient: "",
      doctor: "",
      notes: "",
    };
    setEditedAppointment(newAppointment);
    setAppointmentType(""); // Set the appointment type to an empty string
    setAddAppointmentModalOpen(true);
  };

  return (
    <div>
      <Calendar
        key={calendarKey}
        localizer={localizer}
        events={appointments.map((appointment) => ({
          ...appointment,
          title: formatEventTitle(appointment),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        views={["day", "week", "month"]}
        defaultView="day"
        // Set the minimum and maximum times for appointments on the calendar
        min={new Date(2023, 7, 2, 8, 0)}
        max={new Date(2023, 7, 2, 17, 0)}
        onSelectEvent={handleCellClick}
        components={{
          event: AppointmentEvent,
        }}
      />
      <div>
        <Button
          variant="contained"
          onClick={handleAddAppointment}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          Add Appointment
        </Button>
      </div>
      <MuiModal
        open={isAddAppointmentModalOpen || selectedAppointment !== null}
        onClose={handleCloseModal}
        aria-labelledby="appointment-details-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 3,
            borderRadius: 4,
          }}
        >
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          {editedAppointment && (
            <div>
              <Autocomplete
                options={patients}
                getOptionLabel={(option) => `${option.first_name} ${option.last_name} - ${option.email}`}
                fullWidth
                value={editedAppointment ? patients.find(patient => patient._id === editedAppointment.patient) : null}
                onChange={(_, newValue) => handleFormChange("patient", newValue ? newValue._id : "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Patient"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <TextField
                label="Doctor"
                value={editedAppointment.doctor}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => handleFormChange("doctor", e.target.value)}
              />
              <TextField
                select
                label="Appointment Type"
                value={appointmentType}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <MenuItem value="first appointment">First Appointment</MenuItem>
                <MenuItem value="standard appointment">
                  Standard Appointment
                </MenuItem>
                <MenuItem value="long appointment">Long Appointment</MenuItem>
                <MenuItem value="follow up appointment">
                  Follow-up Appointment
                </MenuItem>
              </TextField>
              {/* Editable Date Field */}
              <TextField
                label="Date"
                type="date" // Add type="date" to enable editing for the date field
                value={moment(editedAppointment.start).format("YYYY-MM-DD")}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) =>
                  handleFormChange(
                    "start",
                    moment(e.target.value, "YYYY-MM-DD").toDate()
                  )
                }
              />
              {/* Editable Start Time Field */}
              <TextField
                label="Start Time"
                sx={{ mb: 2 }}
                type="time" // Add type="time" to enable editing for the start time field
                // Add min and max properties to restrict the time range
                inputProps={{
                  min: "08:00",
                  max: "17:00",
                }}
                value={moment(editedAppointment.start).format("HH:mm")}
                fullWidth
                onChange={(e) =>
                  handleFormChange(
                    "start",
                    moment(
                      `${moment(editedAppointment.start).format(
                        "YYYY-MM-DD"
                      )}T${e.target.value}`
                    ).toDate()
                  )
                }
              />
              {/* Editable End Time Field */}
              <TextField
                label="End Time"
                sx={{ mb: 2 }}
                type="time" // Add type="time" to enable editing for the end time field
                // Add min and max properties to restrict the time range
                inputProps={{
                  min: "08:00",
                  max: "17:00",
                }}
                value={moment(editedAppointment.end).format("HH:mm")}
                fullWidth
                onChange={(e) =>
                  handleFormChange(
                    "end",
                    moment(
                      `${moment(editedAppointment.end).format("YYYY-MM-DD")}T${
                        e.target.value
                      }`
                    ).toDate()
                  )
                }
              />
              <TextField
                label="Notes"
                value={editedAppointment.notes}
                fullWidth
                onChange={(e) => handleFormChange("notes", e.target.value)}
              />
              <Button
                onClick={handleReset}
                variant="contained"
                sx={{ mr: 2, mb: 2, mt: 2 }}
              >
                Reset
              </Button>
              {/* Delete Button */}
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
              >
                Delete Appointment
              </Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ mr: 2 }}>
                Save Changes
              </Button>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                sx={{ mr: 2 }}
              >
                Close
              </Button>
            </div>
          )}
        </Box>
      </MuiModal>
    </div>
  );
};

export default AppointmentCalendar;