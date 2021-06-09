import React, { useState } from "react";
import ReportDatePicker from "./components/ReportDatePicker";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Divider, Box } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormDialog from "./components/FormDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  contents1: { [theme.breakpoints.up("sm")]: { display: "flex" } },
  leftColumn: {
    [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) },
  },
  rightColumn: { [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) } },
  createReportButton: { margin: theme.spacing(1) },
}));

const DEFAULT_REPORT = {
  date: "",
  content: "",
  report_items: [
    {
      category: "",
      content: "",
      hour: 1,
      minute: 0,
    },
  ],
  updatedAt: 0,
};

const localStorageGetItemReports = localStorage.getItem("reports")
  ? JSON.parse(localStorage.getItem("reports"))
  : [];

/**
 * コンポーネントです。
 */
const App = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [reports, setReports] = useState(localStorageGetItemReports);
  // 日報入力ダイアログの初期値
  const [defaultReport, setDefaultReport] = useState(
    JSON.parse(JSON.stringify(DEFAULT_REPORT))
  );

  /**
   * 日報を作成する処理です。
   * @param {*} input
   */
  const onCreateReport = (input) => {
    setReports((reports) => {
      let newReports = [input, ...reports]
        // 重複を削除
        .filter(
          (element, index, array) =>
            array.findIndex((e) => e.date === element.date) === index
        )
        // 並べ替え
        .sort((a, b) => {
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
   * 作成ボタンがクリックされたときの処理です。
   * @param {*} event
   */
  const onCreateButtonClick = (event) => {
    setDefaultReport(JSON.parse(JSON.stringify(DEFAULT_REPORT)));
    setFormDialogOpen(true);
  };

  /**
   * 編集ボタンがクリックされたときの処理です。
   * @param {*} date
   */
  const onEditButtonClick = (date) => {
    setDefaultReport(() => {
      let defaultReport = JSON.parse(
        JSON.stringify(
          reports.filter((report, index) => {
            return report.date.includes(format(selectedDate, "yyyy-MM-dd"));
          })[0]
        )
      );
      return defaultReport;
    });
    setFormDialogOpen(true);
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
      localStorage.setItem("reports", JSON.stringify(newReports));
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
                  onClick={(event) => onCreateButtonClick(event)}
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
                    <div key={index}>
                      {report.date.replaceAll("-", ".")}
                      {report.report_items.map(
                        (reportItem, reportItemIndex) => {
                          return (
                            <div key={reportItemIndex}>
                              《{reportItem.category}》 {reportItem.content}{" "}
                              {reportItem.hour}:{reportItem.minute}
                            </div>
                          );
                        }
                      )}
                      <Box fontSize="0.5rem">{report.content}</Box>
                      <div>
                        <Button onClick={() => onEditButtonClick(report.date)}>
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
                  );
                } else {
                  return <Fragment key={index}></Fragment>;
                }
              })}
          </div>
        </div>
        <Typography variant="h5">日報一覧</Typography>
        {reports.map((report, index) => {
          return (
            <Fragment key={index}>
              {report.date.includes(calendarMonth) && (
                <div>
                  {report.date.replaceAll("-", ".")}
                  {report.report_items.map((reportItem, reportItemIndex) => {
                    return (
                      <Fragment key={reportItemIndex}>
                        <div>
                          《{reportItem.category}》 {reportItem.content}{" "}
                          {reportItem.hour}:{reportItem.minute}
                        </div>
                      </Fragment>
                    );
                  })}
                  <Box fontSize="0.5rem">{report.content}</Box>
                  <Divider />
                </div>
              )}
            </Fragment>
          );
        })}
      </main>
      {formDialogOpen && (
        <FormDialog
          open={formDialogOpen}
          setOpen={setFormDialogOpen}
          selectedDate={selectedDate}
          onCreate={onCreateReport}
          defaultReport={defaultReport}
        />
      )}
    </>
  );
};

export default App;
