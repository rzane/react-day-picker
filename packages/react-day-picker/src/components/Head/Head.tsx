import React from 'react';

import { useDayPicker } from 'hooks';

/**
 * Render the Head component - i.e. the table head with the weekday names.
 */
export function Head(): JSX.Element {
  const {
    classNames,
    styles,
    showWeekNumber,
    locale,
    formatters: { formatWeekdayName },
    labels: { labelWeekday },
    weekdays
  } = useDayPicker();
  return (
    <thead style={styles.head} className={classNames.head}>
      <tr style={styles.head_row} className={classNames.head_row}>
        {showWeekNumber && (
          <th
            scope="col"
            style={styles.head_cell}
            className={classNames.head_cell}
          ></th>
        )}
        {weekdays.map((weekday, i) => (
          <th
            key={i}
            scope="col"
            className={classNames.head_cell}
            style={styles.head_cell}
            aria-label={labelWeekday(weekday, { locale })}
          >
            {formatWeekdayName(weekday, { locale })}
          </th>
        ))}
      </tr>
    </thead>
  );
}
