import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button, Modal as MuiModal, TextField, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

const localizer = momentLocalizer(moment);

// const initialAppointments = [
//   {
//     id: 1,
//     title: "Routine checkup",
//     start: new Date(2023, 7, 2, 10, 0),
//     end: new Date(2023, 7, 2, 12, 0),
//     patient: "John Doe",
//     doctor: "Dr. Smith",
//     notes: "Routine checkup",
//   },
//   {
//     id: 2,
//     title: "Routine checkup",
//     start: new Date(2023, 7, 3, 14, 0),
//     end: new Date(2023, 7, 3, 16, 0),
//     patient: "Jane Smith",
//     doctor: "Dr. Johnson",
//     notes: "Follow-up appointment",
//   },
//   // Add more appointments as needed
// ];

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
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showOverlapError, setShowOverlapError] = useState(false);
  const [isAddAppointmentModalOpen, setAddAppointmentModalOpen] =
    useState(false);
  const [appointmentType, setAppointmentType] = useState("");

  const handleCellClick = (event) => {
    setSelectedAppointment(event);
    setEditedAppointment({ ...event });
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/your-backend-endpoint"); // Replace with your actual endpoint URL
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setEditedAppointment(null);
    setShowOverlapError(false); // Reset the overlap error state
    setErrorMessage(null); // Reset the error message
    setAddAppointmentModalOpen(false); // Set the state to false to close the modal
  };

  const setError = (message) => {
    setShowOverlapError(false); // Reset overlap error state when setting another error
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

    // Check for overlapping appointments
    const isOverlapping = appointments.some((appointment) => {
      // Skip the current edited appointment during the check
      if (editedAppointment && editedAppointment.id === appointment.id) {
        return false;
      }

      return (
        (editedAppointment.start >= appointment.start &&
          editedAppointment.start < appointment.end) ||
        (editedAppointment.end > appointment.start &&
          editedAppointment.end <= appointment.end) ||
        (editedAppointment.start <= appointment.start &&
          editedAppointment.end >= appointment.end)
      );
    });

    if (isOverlapping) {
      setShowOverlapError(true);
      return;
    }

    // Backend call
    fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // add any other necessary headers, like authentication tokens
      },
      body: JSON.stringify(editedAppointment),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
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
            // If it's a new appointment, add it to the appointments list
            setAppointments((prevAppointments) => [
              ...prevAppointments,
              { ...data.appointment },
            ]);
          }
        } else {
          setError(data.message || "Error saving the appointment.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error saving the appointment.");
      });

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

  useEffect(() => {
    setCalendarKey((prevKey) => prevKey + 1);
  }, [appointments]);

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

  function deleteAppointmentFromServer(appointmentId) {
    fetch(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
      headers: {
        // Any necessary headers, like authentication tokens
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Remove the appointment from the local state/appointments array
          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.id !== appointmentId
            )
          );
        } else {
          setError(data.message || "Error deleting the appointment.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error deleting the appointment.");
      });
  }

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
          {showOverlapError && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              Another appointment is already booked during this time slot.
            </div>
          )}
          {editedAppointment && (
            <div>
              <TextField
                label="Patient"
                value={editedAppointment.patient}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => handleFormChange("patient", e.target.value)}
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
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                onClick={() =>
                  deleteAppointmentFromServer(editedAppointment.id)
                }
              >
                Delete
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
