import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy年 MMM", { locale: this.locale });
  }
  getDatePickerHeaderText(date) {
    return format(date, "MMMd日", { locale: this.locale });
  }
}

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="static"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="日付を選択"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          maxDate={new Date()}
          minDate={new Date("2019-08-20")}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
