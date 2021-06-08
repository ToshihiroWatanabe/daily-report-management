import React, { useState } from "react";
import ReportDatePicker from "./components/ReportDatePicker";
import CustomDatePicker from "./components/CustomDatePicker";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormDialog from "./components/FormDialog";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  contents1: { [theme.breakpoints.up("sm")]: { display: "flex" } },
  leftColumn: {
    [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) },
  },
  rightColumn: { [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) } },
  createReportButton: { margin: theme.spacing(1) },
}));

function App() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [reports, setReports] = useState([]);

  /**
   * 日報を作成する処理です。
   * @param {*} input
   */
  const onCreateReport = (input) => {
    setReports((reports) => {
      let newReports = [...reports, input].sort((a, b) => {
        return a.date.replaceAll("-", "") - b.date.replaceAll("-", "");
      });
      // localStorage.setItem("reports", JSON.stringify(newReports));
      return newReports;
    });
  };

  const onMonthChange = (event) => {
    setCalendarMonth(format(event, "yyyy-MM"));
  };

  return (
    <>
      <h1>日報管理</h1>
      <main>
        <div className={classes.contents1}>
          <div className={classes.leftColumn}>
            <ReportDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onMonthChange={onMonthChange}
            />
            {/* <CustomDatePicker /> */}
          </div>
          <div className={classes.rightColumn}>
            <Typography variant="h5">
              {format(selectedDate, "yyyy/MM/dd")}の日報
            </Typography>
            <Typography>日報はありません</Typography>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.createReportButton}
              startIcon={<AddCircleOutlineIcon />}
              onClick={(event) => setFormDialogOpen(true)}
            >
              日報作成
            </Button>
            <FormDialog
              open={formDialogOpen}
              setOpen={setFormDialogOpen}
              selectedDate={selectedDate}
              onCreate={onCreateReport}
            />
          </div>
        </div>
        <Typography>日報一覧</Typography>
        {reports.map((report, index) => {
          if (report.date.includes(calendarMonth)) {
            return (
              <>
                <div key={index}>
                  {report.date}
                  {report.report_items.map((reportItem, reportItemIndex) => {
                    return (
                      <>
                        <div key={reportItemIndex}>
                          {reportItem.category} {reportItem.content}{" "}
                          {reportItem.hour}:{reportItem.minute}
                        </div>
                      </>
                    );
                  })}
                  {report.content}
                </div>
              </>
            );
          }
          return null;
        })}
      </main>
    </>
  );
}

export default App;
