---
id: "daycontentprops"
title: "Interface: DayContentProps"
sidebar_label: "DayContentProps"
custom_edit_url: null
hide_title: true
---

# Interface: DayContentProps

Represent the props for the [DayContent](../functions/daycontent.md) component.

## Properties

### aria-label

• **aria-label**: *string*

The ARIA label for the content.

___

### date

• **date**: Date

The date representing the day.

___

### displayMonth

• **displayMonth**: Date

The month where the day is displayed.

___

### format

• **format**: [*DateFormatter*](../types/dateformatter.md)

Function to format `date` according to the initial props.

___

### hiddenClassName

• **hiddenClassName**: *string*

The class name for the aria-label (this element should stay not visible)

___

### locale

• **locale**: Locale

The locale in use.

___

### modifiers

• **modifiers**: *Record*<string, *true*\>

The modifier status for `date`.

___

### outside

• **outside**: *boolean*

Whether the day is outside the `displayMonth`.

___

### showOutsideDays

• `Optional` **showOutsideDays**: *boolean*

Whether DayPicker should show the outside day.
