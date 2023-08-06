{errorMessage && (
    <div style={{ color: "red", marginBottom: "10px" }}>
      {errorMessage}
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