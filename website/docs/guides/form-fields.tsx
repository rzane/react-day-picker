import * as React from 'react';
import { DayPicker, useInput, UseInputOptions } from 'react-day-picker';

import { format } from 'date-fns';

export default function App() {
  // Props to pass to `useInput`
  const options: UseInputOptions = {
    // Select today as default
    defaultSelected: new Date(),
    // Limit the valid dates
    fromYear: 2020,
    toYear: 2022,
    // Make the selection mandatory.
    required: true
  };
  const input = useInput('PP', options);

  const footer = (
    <form>
      <input {...input.fieldProps} placeholder={format(new Date(), 'PP')} />
    </form>
  );
  return (
    <>
      <p>Type a day or pick one from the calendar.</p>
      <DayPicker {...input.dayPickerProps} showWeekNumber footer={footer} />
    </>
  );
}
