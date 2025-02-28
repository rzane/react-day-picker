import * as React from 'react';

import { differenceInCalendarDays, format, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { parseFromToProps } from 'hooks/useDayPicker/utils/parseFromToProps';
import { DayClickEventHandler, MonthChangeEventHandler } from 'types';

import { UseInputDayPickerProps } from './UseInputDayPickerProps';
import { UseInputFieldProps } from './UseInputFieldProps';
import { UseInputOptions } from './UseInputOptions';
import { isValidDate } from './utils/isValidDate';

/**
 * Return props for binding an input field to DayPicker.
 */
export function useInput(
  /** The format string for formatting the input field. See https://date-fns.org/docs/format for a list of format strings. */
  formatStr: string,
  /** The default day being selected. */
  options?: UseInputOptions
): {
  /** The props to pass to a DayPicker component. */
  dayPickerProps: UseInputDayPickerProps;
  /** The props to pass to an input field. */
  fieldProps: UseInputFieldProps;
  /** A function to reset to the initial state. */
  reset: () => void;
  /** A function to set the selected day. */
  setSelected: (day: Date) => void;
} {
  const props = options || {};
  const {
    locale = enUS,
    required,
    defaultSelected,
    today = new Date()
  } = props;
  const { fromDate, toDate } = parseFromToProps(props);

  const min = required ? 1 : 0;

  // Shortcut to the DateFns functions
  const parseValue = (value: string) =>
    parse(value, formatStr, today, { locale });

  // Initialize states
  const [month, setMonth] = React.useState(defaultSelected ?? today);
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    defaultSelected
  );
  const defaultInputValue = defaultSelected
    ? format(defaultSelected, formatStr, { locale })
    : '';
  const [inputValue, setInputValue] = React.useState(defaultInputValue);

  const reset = () => {
    setSelectedDay(defaultSelected);
    setMonth(defaultSelected ?? today);
    setInputValue(defaultInputValue ?? '');
  };

  const setSelected = (date: Date | undefined) => {
    setSelectedDay(date);
    setMonth(date ?? today);
    setInputValue(date ? format(date, formatStr, { locale }) : '');
  };

  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    if (!required && selected) {
      setSelectedDay(undefined);
      setInputValue('');
      return;
    }
    setSelectedDay(day);
    setInputValue(day ? format(day, formatStr, { locale }) : '');
  };

  const handleMonthChange: MonthChangeEventHandler = (month) => {
    setMonth(month);
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseValue(e.target.value);
    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
    setMonth(day);
  };

  // Special case for _required_ fields: on blur, if the value of the input is not
  // a valid date, reset the calendar and the input value.
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const day = parseValue(e.target.value);
    if (!isValidDate(day)) {
      reset();
    }
  };

  // When focusing, make sure DayPicker visualizes the month of the date in the
  // input field.
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      reset();
      return;
    }
    const day = parseValue(e.target.value);
    if (isValidDate(day)) {
      setMonth(day);
    }
  };

  const dayPickerProps: UseInputDayPickerProps = {
    month: month,
    onDayClick: handleDayClick,
    onMonthChange: handleMonthChange,
    selected: selectedDay,
    locale,
    fromDate: options?.fromDate,
    toDate: options?.toDate,
    today,
    min
  };

  const fieldProps: UseInputFieldProps = {
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    value: inputValue
  };

  return { dayPickerProps, fieldProps, reset, setSelected };
}
