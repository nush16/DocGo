const handleDelete = async () => {
    if (editedAppointment && editedAppointment.id) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== editedAppointment.id
        )
      );
      handleCloseModal();
    }
  };