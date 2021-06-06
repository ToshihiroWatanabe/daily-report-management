import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy MMM", { locale: this.locale });
  }
  getDatePickerHeaderText(date) {
    return format(date, "MMMd日", { locale: this.locale });
  }
}

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div className="App">
      <h1>日報管理アプリ</h1>
      <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
        <DatePicker
          okLabel="決定"
          cancelLabel="キャンセル"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
