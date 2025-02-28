import * as React from 'react';

import { isSameMonth } from 'date-fns';
import {
  useDayPicker,
  useModifiers,
  useSelectMultiple,
  useSelectRange,
  useSelectSingle
} from 'hooks';

import { useDayFocus } from './hooks/useDayFocus';

/** Represent the props used by the [[Day]] component. */
export interface DayProps {
  /** The month where the date is displayed. */
  displayMonth: Date;
  /** The date to render. */
  date: Date;
}

/**
 * The content of a day cell – as a button or span element according to its
 * modifiers.
 */
export function Day(props: DayProps): JSX.Element | null {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { date, displayMonth } = props;

  const { mode = 'uncontrolled', ...context } = useDayPicker();

  const single = useSelectSingle();
  const multiple = useSelectMultiple();
  const range = useSelectRange();

  const { focus, blur, focusOnKeyDown, isFocused } = useDayFocus(
    date,
    buttonRef
  );
  const {
    modifiers,
    modifierClassNames: modifierClassNames,
    modifierStyle
  } = useModifiers(date);

  const {
    components: { DayContent },
    formatters: { formatDay },
    labels: { labelDay },
    locale,
    showOutsideDays
  } = context;

  if (modifiers.hidden) return <></>;

  const ariaLabel = labelDay(date, modifiers, { locale });
  const ariaPressed = modifiers.selected;

  // #region Event handlers
  const handleClick: React.MouseEventHandler = (e) => {
    switch (mode) {
      case 'single':
        single.handleDayClick?.(date, modifiers, e);
        break;
      case 'multiple':
        multiple.handleDayClick?.(date, modifiers, e);
        break;
      case 'range':
        range.handleDayClick?.(date, modifiers, e);
        break;
    }
    context.onDayClick?.(date, modifiers, e);
  };

  const handleFocus: React.FocusEventHandler = (e) => {
    focus(date);
    context.onDayFocus?.(date, modifiers, e);
  };

  const handleBlur: React.FocusEventHandler = (e) => {
    blur();
    context.onDayBlur?.(date, modifiers, e);
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    focusOnKeyDown(e);
    context.onDayKeyDown?.(date, modifiers, e);
  };

  const handleKeyUp: React.KeyboardEventHandler = (e) => {
    context.onDayKeyUp?.(date, modifiers, e);
  };
  const handleMouseEnter: React.MouseEventHandler = (e) => {
    context.onDayMouseEnter?.(date, modifiers, e);
  };
  const handleMouseLeave: React.MouseEventHandler = (e) => {
    context.onDayMouseLeave?.(date, modifiers, e);
  };
  const handleTouchCancel: React.TouchEventHandler = (e) => {
    context.onDayTouchCancel?.(date, modifiers, e);
  };
  const handleTouchEnd: React.TouchEventHandler = (e) => {
    context.onDayTouchEnd?.(date, modifiers, e);
  };
  const handleTouchMove: React.TouchEventHandler = (e) => {
    context.onDayTouchMove?.(date, modifiers, e);
  };
  const handleTouchStart: React.TouchEventHandler = (e) => {
    context.onDayTouchStart?.(date, modifiers, e);
  };

  // #endregion

  const classNames = [context.classNames.day].concat(modifierClassNames);
  const style = { ...context.styles.day, ...modifierStyle };

  const isOutside = !isSameMonth(date, displayMonth);
  if (isOutside) {
    classNames.push(context.classNames.day_outside);
  }

  const dayContent = (
    <DayContent
      aria-label={ariaLabel}
      date={date}
      displayMonth={displayMonth}
      format={formatDay}
      hiddenClassName={context.classNames.hidden}
      locale={locale}
      modifiers={modifiers}
      outside={isOutside}
      showOutsideDays={showOutsideDays}
    />
  );

  const isDisabled = modifiers.disabled || isOutside;
  const isNotInteractive = mode === 'uncontrolled' && !context.onDayClick;
  const tabIndex = isDisabled || isFocused || !isNotInteractive ? -1 : 0;

  const className = [...classNames].join(' ');

  if (mode === 'uncontrolled' && !context.onDayClick) {
    return (
      <div style={style} className={className}>
        {dayContent}
      </div>
    );
  }

  const buttonClassName = [context.classNames.button_reset, ...classNames].join(
    ' '
  );

  return (
    <button
      ref={buttonRef}
      aria-pressed={ariaPressed}
      style={style}
      disabled={isDisabled}
      className={buttonClassName}
      tabIndex={tabIndex}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {dayContent}
    </button>
  );
}
