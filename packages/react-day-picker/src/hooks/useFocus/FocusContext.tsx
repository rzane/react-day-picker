import * as React from 'react';

import { addDays, addMonths, addWeeks, isSameMonth } from 'date-fns';

import { useDayPickerContext } from '../useDayPickerContext';
import { isMatch } from '../useModifiers/utils/isMatch';
import { useNavigation } from '../useNavigation';

export type FocusContextValue = [
  focusedDay: Date | undefined,
  setters: {
    focus: (day: Date) => void;
    blur: () => void;
    focusDayAfter: () => void;
    focusDayBefore: () => void;
    focusDayUp: () => void;
    focusDayDown: () => void;
  }
];

export const FocusContext = React.createContext<FocusContextValue | undefined>(
  undefined
);

export const FocusProvider = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [focusedDay, setDay] = React.useState<Date | undefined>();
  const { setMonth, displayMonths } = useNavigation();
  const { modifiers, numberOfMonths } = useDayPickerContext();

  const blur = () => setDay(undefined);
  const focus = (date: Date) => setDay(date);

  const switchMonth = (date: Date, offset: number) => {
    if (displayMonths.some((m) => isSameMonth(date, m))) return;
    if (offset < 0) {
      setMonth(addMonths(date, 1 + offset));
    } else {
      setMonth(date);
    }
  };

  const isFocusable = (day: Date) => {
    if (isMatch(day, modifiers.disabled)) return false;
    return true;
  };

  const focusDayBefore = () => {
    if (!focusedDay) return;
    const before = addDays(focusedDay, -1);
    if (!isFocusable(before)) return;
    setDay(before);
    switchMonth(before, numberOfMonths * -1);
  };
  const focusDayAfter = () => {
    if (!focusedDay) return;
    const after = addDays(focusedDay, 1);
    if (!isFocusable(after)) return;
    setDay(after);
    switchMonth(after, numberOfMonths);
  };
  const focusDayUp = () => {
    if (!focusedDay) return;
    const up = addWeeks(focusedDay, -1);
    if (!isFocusable(up)) return;
    setDay(up);
    switchMonth(up, numberOfMonths * -1);
  };
  const focusDayDown = () => {
    if (!focusedDay) return;
    const down = addWeeks(focusedDay, 1);
    if (!isFocusable(down)) return;
    setDay(down);
    switchMonth(down, numberOfMonths);
  };

  const setters = {
    blur,
    focus,
    focusDayAfter,
    focusDayBefore,
    focusDayUp,
    focusDayDown
  };

  return (
    <FocusContext.Provider value={[focusedDay, setters]}>
      {children}
    </FocusContext.Provider>
  );
};
