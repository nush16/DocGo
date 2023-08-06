import React, { useState, useEffect, useContext} from "react";
import { AuthContext } from '../../AuthContext';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button, Modal as MuiModal, TextField, MenuItem, Autocomplete, } from "@mui/material";
import { Box } from "@mui/system";
import axios from '../../axiosConfig';

const localizer = momentLocalizer(moment);

const AppointmentCalendar = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const { token } = useContext(AuthContext);
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAddAppointmentModalOpen, setAddAppointmentModalOpen] =useState(false);
  const modalTitle = isAddAppointmentModalOpen ? "Create Appointment" : "Edit Appointment";
  const backendURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URL_DEV : process.env.REACT_APP_BACKEND_URL_PROD;

  const handleCellClick = (event) => {
    console.log("Clicked event details:", event);
    setSelectedAppointment(event);
    setEditedAppointment({ ...event });
  };

  const events = appointments.map((appointment) => ({
    ...appointment,
    id: appointment._id,
    title: `${appointment.practitioner.first_name} ${appointment.practitioner.last_name} ${appointment.type} with ${appointment.patient.first_name} ${appointment.patient.last_name}`, // Adjust according to your data structure
    start: new Date(appointment.startTime),
    end: new Date(appointment.endTime),
  }));

  // Function to fetch patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${backendURL}/patients`, { headers: { Authorization: `Bearer ${token}` } });
      setPatients(response.data);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  // Function to fetch practitioners
  const fetchPractitioners = async () => {
    try {
      const response = await axios.get(`${backendURL}/users`, { headers: { Authorization: `Bearer ${token}` } });
      const practitioners = response.data.filter(user => user.isPractitioner);
      setPractitioners(practitioners);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  // Function to fetch appointments
  const fetchAppointments = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the JWT token as a header
      },
    };

    axios.get(`${backendURL}/appointments`, config)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  const createAppointment = async (appointment, token, setAppointments,) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        practitioner: appointment.doctor,
        type: appointment.type,
        patient: appointment.patient,
        startTime: appointment.start,
        endTime: appointment.end,
        note: appointment.notes,
      });
      console.log("Request Body:", body);
      const response = await axios.post(`${backendURL}/appointments`, body, config);
      const newAppointment = {
        ...response.data,
        id: response.data._id, // Assuming the new ID is in the response data, adjust as needed
        title: `${response.data.practitioner.first_name} ${response.data.practitioner.last_name} ${response.data.type} with ${response.data.patient.first_name} ${response.data.patient.last_name}`,
        start: new Date(response.data.startTime),
        end: new Date(response.data.endTime),
      };
      
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      alert("Appointment created successfully!");
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  

  //Load Appointments from the Server
  useEffect(() => {
    fetchPatients();
    fetchPractitioners();
    fetchAppointments();
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

  const handleDelete = async () => {
    if (editedAppointment && editedAppointment._id) {
      try {
        // Send DELETE request to the server with the appointment ID
        const response = await axios.delete(`${backendURL}/appointments/${editedAppointment.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // If the delete was successful, update the local state
        if (response.status === 200) {
          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.id !== editedAppointment.id
            )
          );
          alert("Appointment deleted successfully!");
          handleCloseModal();
          setCalendarKey((prevKey) => prevKey + 1);
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment. Please try again.");
      }
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
      createAppointment(editedAppointment, token, setAppointments);
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
      type: "",
    };
    setEditedAppointment(newAppointment);
    setAddAppointmentModalOpen(true);
  };

  return (
    <div>
      <Calendar
        key={calendarKey}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        views={["day", "week", "month"]}
        defaultView="day"
        // Set the minimum and maximum times for appointments on the calendar
        min={new Date(2023, 7, 2, 8, 0)}
        max={new Date(2023, 7, 2, 17, 0)}
        onSelectEvent={handleCellClick}
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
          <h2>{modalTitle}</h2>
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
                defaultValue={null}
                fullWidth
                value={editedAppointment ? patients.find(patient => patient._id === editedAppointment.patient._id) : null}
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
              <Autocomplete
                options={practitioners}
                getOptionLabel={(option) => `${option.first_name} ${option.last_name} - ${option.email}`}
                value={practitioners.find((practitioner) => practitioner.id === editedAppointment.doctor)}
                onChange={(event, newValue) =>
                  handleFormChange("doctor", newValue ? newValue._id : "")
                }
                renderInput={(params) => (
                  <TextField {...params} label="Doctor" fullWidth sx={{ mb: 2 }} />
                )}
              />
              <Autocomplete
                value={editedAppointment ? editedAppointment.type : ""}
                onChange={(event, newValue) => handleFormChange("type", newValue)}
                options={[
                  "first appointment",
                  "standard appointment",
                  "long appointment",
                  "follow up appointment"
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="Appointment Type" fullWidth sx={{ mb: 2 }} />
                )}
              />
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