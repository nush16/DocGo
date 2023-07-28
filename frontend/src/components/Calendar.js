import React, { useState } from 'react';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';


const currentDate = new Date().toISOString().slice(0,10);

const schedulerData = [{
  startDate: `${currentDate}T10:00`,
  endDate: `${currentDate}T10:30`,
  title: 'Patient Name',
}];

export default function Calendar() {
  const [appointments, setAppointments] = useState(schedulerData);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
      setAppointments([...appointments, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setAppointments(appointments.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setAppointments(appointments.filter(appointment => appointment.id !== deleted));
    }
  };

  return (
    <Scheduler
      data={appointments}
    >
      <ViewState
        defaultCurrentDate={currentDate}
        defaultCurrentViewName="Day"
      />
      <EditingState
        onCommitChanges={commitChanges}
      />
      <DayView
        startDayHour={8}
        endDayHour={17}
      />
      <WeekView
        startDayHour={8}
        endDayHour={17}
      />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <ViewSwitcher />
      <Appointments />
      <AppointmentForm />
    </Scheduler>
  );
}
