import * as React from 'react';
import { DateRange, DayPicker } from 'react-day-picker';

import { format } from 'date-fns';

export default function App() {
  const [range, setRange] = React.useState<DateRange | undefined>();

  let footer = 'Please pick the first day.';
  if (range && range.from && !range.to) footer = 'Please pick the last day.';
  if (range && range.from && range.to)
    footer = `${format(range.from, 'PPP')}–${format(range.to, 'PPP')}`;

  return (
    <DayPicker
      mode="range"
      min={1}
      max={5}
      onSelect={setRange}
      footer={footer}
    />
  );
}
