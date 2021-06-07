import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  Day,
} from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";
import {
  endOfWeek,
  isSameDay,
  isWeekend,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import clsx from "clsx";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  red: {
    color: "red",
  },
  blue: {
    color: "blue",
  },
}));

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy年 MMM", { locale: this.locale });
  }
  getDatePickerHeaderText(date) {
    return format(date, "MMMd日", { locale: this.locale });
  }
}

export default function DatePicker(props) {
  const classes = useStyles();
  const handleDateChange = (date) => {
    // console.log(format(date, "yyyy/MM/dd"));
    props.setSelectedDate(date);
  };

  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    if (day.getDay() === 0 && day < new Date()) {
      return React.cloneElement(dayComponent, {
        style: { ...dayComponent.props.style, color: "red" },
      });
    } else if (day.getDay() === 6 && day < new Date()) {
      return React.cloneElement(dayComponent, {
        style: { ...dayComponent.props.style, color: "blue" },
      });
    } else {
      return dayComponent;
    }
  };

  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="static"
          format="yyyy/MM/dd"
          margin="normal"
          value={props.selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          maxDate={new Date()}
          minDate={new Date("2019-08-20")}
          renderDay={renderDay}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
