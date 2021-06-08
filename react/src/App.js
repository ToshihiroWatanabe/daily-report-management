import React, { useState } from "react";
import ReportDatePicker from "./components/ReportDatePicker";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Divider, Box } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormDialog from "./components/FormDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  contents1: { [theme.breakpoints.up("sm")]: { display: "flex" } },
  leftColumn: {
    [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) },
  },
  rightColumn: { [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) } },
  createReportButton: { margin: theme.spacing(1) },
}));

const localStorageGetItemReports = localStorage.getItem("reports")
  ? JSON.parse(localStorage.getItem("reports"))
  : [];

const App = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [reports, setReports] = useState(localStorageGetItemReports);
  const [isExist, setIsExist] = useState(false);

  /**
   * 日報を作成する処理です。
   * @param {*} input
   */
  const onCreateReport = (input) => {
    setReports((reports) => {
      let newReports = [...reports, input].sort((a, b) => {
        return a.date.replaceAll("-", "") - b.date.replaceAll("-", "");
      });
      localStorage.setItem("reports", JSON.stringify(newReports));
      return newReports;
    });
  };

  /**
   * カレンダーの月が変わったときの処理です。
   * @param {*} event
   */
  const onMonthChange = (event) => {
    setCalendarMonth(format(event, "yyyy-MM"));
  };

  /**
   * 選択した日時が変わったときの処理です。
   */
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  /**
   * 削除ボタンがクリックされたときの処理です。
   * @param {*} date 削除する日報の日付
   */
  const onDeleteButtonClick = (date) => {
    setReports((reports) => {
      let newReports = reports.filter((report) => {
        return report.date !== date;
      });
      return newReports;
    });
  };

  return (
    <>
      <h1>日報管理</h1>
      <main>
        <div className={classes.contents1}>
          <div className={classes.leftColumn}>
            {/* 日付選択カレンダー */}
            <ReportDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onMonthChange={onMonthChange}
              onDateChange={onDateChange}
              reports={reports}
            />
            {/* <CustomDatePicker /> */}
          </div>
          <div className={classes.rightColumn}>
            <Typography variant="h5">
              {format(selectedDate, "yyyy.MM.dd")}の日報
            </Typography>
            {/* 選択した日に日報がなかったとき */}
            {reports.filter((report, index) => {
              return report.date.includes(format(selectedDate, "yyyy-MM-dd"));
            }).length === 0 && (
              <>
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
              </>
            )}
            {/* 選択した日に日報があったとき */}
            {reports.filter((report, index) => {
              return report.date.includes(format(selectedDate, "yyyy-MM-dd"));
            }).length > 0 &&
              reports.map((report, index) => {
                if (report.date.includes(format(selectedDate, "yyyy-MM-dd"))) {
                  return (
                    <>
                      <div key={index}>
                        {report.date.replaceAll("-", ".")}
                        {report.report_items.map(
                          (reportItem, reportItemIndex) => {
                            return (
                              <>
                                <div key={reportItemIndex}>
                                  《{reportItem.category}》 {reportItem.content}{" "}
                                  {reportItem.hour}:{reportItem.minute}
                                </div>
                              </>
                            );
                          }
                        )}
                        <Box fontSize="0.5rem">{report.content}</Box>
                        <div>
                          <Button>
                            <EditIcon fontSize="inherit" />
                            編集
                          </Button>
                          <Button
                            onClick={() => onDeleteButtonClick(report.date)}
                          >
                            <DeleteIcon fontSize="inherit" />
                            削除
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return null;
                }
              })}
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
                  {report.date.replaceAll("-", ".")}
                  {report.report_items.map((reportItem, reportItemIndex) => {
                    return (
                      <>
                        <div key={reportItemIndex}>
                          《{reportItem.category}》 {reportItem.content}{" "}
                          {reportItem.hour}:{reportItem.minute}
                        </div>
                      </>
                    );
                  })}
                  <Box fontSize="0.5rem">{report.content}</Box>
                  <Divider />
                </div>
              </>
            );
          } else {
            return null;
          }
        })}
      </main>
    </>
  );
};

export default App;
