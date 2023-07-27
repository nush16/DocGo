import React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = new Date().toISOString().slice(0,10);

const schedulerData = [{
  startDate: `${currentDate}T10:00`,
  endDate: `${currentDate}T10:30`,
  title: 'Patient Name',
}];

export default function Demo() {
  return (
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        defaultCurrentDate={currentDate}
        defaultCurrentViewName="Day"
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
    </Scheduler>
  );
}
