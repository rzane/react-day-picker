import * as React from 'react';

import { useDayPicker } from 'hooks';

/**
 * The props for the [[WeekNumber]] component.
 */
export interface WeekNumberProps {
  /** The number of the week. */
  number: number;
  /** The dates in the week. */
  dates: Date[];
}

/**
 * Render the week number element. If `onWeekNumberClick` is passed to DayPicker, it
 * renders a button, otherwise a span element.
 */
export function WeekNumber(props: WeekNumberProps): JSX.Element {
  const { number: weekNumber, dates } = props;
  const {
    onWeekNumberClick,
    styles,
    classNames,
    locale,
    labels: { labelWeekNumber },
    formatters: { formatWeekNumber }
  } = useDayPicker();

  const handleClick: React.MouseEventHandler = function (e) {
    onWeekNumberClick?.(weekNumber, dates, e);
  };

  const content = formatWeekNumber(Number(weekNumber), { locale });

  if (!onWeekNumberClick) {
    return (
      <span className={classNames.weeknumber} style={styles.weeknumber}>
        {content}
      </span>
    );
  }

  const label = labelWeekNumber(Number(weekNumber), { locale });

  return (
    <button
      aria-label={label}
      className={[classNames.button_reset, classNames.weeknumber].join(' ')}
      style={styles.weeknumber}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
