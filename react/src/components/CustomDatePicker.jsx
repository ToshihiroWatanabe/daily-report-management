import { makeStyles } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";

const useStyles = makeStyles((theme) => ({
  dayWithDotContainer: {
    position: "relative",
  },
  dayWithDot: {
    position: "absolute",
    height: 0,
    width: 0,
    border: "3px solid",
    borderRadius: 4,
    borderColor: theme.palette.secondary.main,
    right: "50%",
    transform: "translateX(3px)",
    top: "75%",
  },
}));

/**
 * ドットあり
 */
export default function CustomDatePicker(props) {
  const { selectedDate, onChange } = props;
  const [daysWithDot, setDaysWithDot] = useState([]);

  const classes = useStyles();

  const onOpenPicker = () => {
    onPickerViewChange(selectedDate);
  };

  const onPickerViewChange = async (date) => {
    // const variables = {
    //   fromDate: date.clone().startOf("month").format("YYYY/MM/DD"),
    //   toDate: date.clone().endOf("month").format("YYYY/MM/DD"),
    // };
    // return request(url, query, variables)
    //   .then((response) => {
    //     setDaysWithDot(
    //       response.data.map((day) => moment(day).format("YYYY/MM/DD"))
    //     );
    //   })
    //   .catch((err) => Logger.error(err));
  };

  const renderDayInPicker = (
    date,
    selectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    // if (daysWithDot.includes(format(date, "yyyy/MM/dd"))) {
    if (true) {
      return (
        <div className={classes.dayWithDotContainer}>
          {dayComponent}
          <div className={classes.dayWithDot} />
        </div>
      );
    }

    return dayComponent;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        renderDay={renderDayInPicker}
        onOpen={onOpenPicker}
        onMonthChange={onPickerViewChange}
        onYearChange={onPickerViewChange}
        variant={"dialog"}
        value={selectedDate}
        onChange={onChange}
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
}
