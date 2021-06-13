import React, { Fragment, useState } from "react";
import ReportDatePicker from "./components/ReportDatePicker";
import ReportFormDialog from "./components/ReportFormDialog";
import ReportCard from "./components/ReportCard";
import format from "date-fns/format";
import preval from "preval.macro";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import GitHubIcon from "@material-ui/icons/GitHub";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { Switch, Route } from "react-router-dom";
import ReportAnalytics from "./components/ReportAnalytics";
import { exportReportsToTxt, exportReportsToJson } from "./utils/export";

/** ドロワーの横幅 */
const DRAWER_WIDTH = "15rem";

// 開発中はページタイトルを変更
if (
  process.env.NODE_ENV === "development" &&
  !document.title.match(/.*開発中.*/)
) {
  document.title += "(開発中)";
}

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

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "5rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  contents1: {
    [theme.breakpoints.up("md")]: { display: "flex" },
  },
  leftColumn: {
    [theme.breakpoints.up("md")]: { margin: theme.spacing(1) },
  },
  rightColumn: { [theme.breakpoints.up("md")]: { margin: theme.spacing(1) } },
  selectedDateReportHeading: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: "0.5rem",
    },
  },
  selectedDateReportNotFound: {
    marginTop: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  createReportButton: { margin: theme.spacing(1) },
  reportCard: {
    margin: theme.spacing(2),
  },
  reportsHeading: {
    [theme.breakpoints.up("md")]: { margin: "0 1rem" },
  },
  monthReportNotFound: {
    [theme.breakpoints.up("md")]: { margin: "1rem" },
  },
}));

/**
 * Appコンポーネントです。
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
  // カテゴリーの配列
  const [categories, setCategories] = useState(() => {
    let categories = [];
    for (let i = 0; i < reports.length; i++) {
      for (let j = 0; j < reports[i].report_items.length; j++) {
        categories.push({
          label: reports[i].report_items[j].category,
          value: reports[i].report_items[j].category,
        });
      }
    }
    // 重複を削除
    let newCategories = categories.filter((element, index, array) => {
      return (
        array.findIndex((element2) => element.label === element2.label) ===
        index
      );
    });
    return newCategories;
  });

  /**
   * ヘッダーのタイトルがクリックされたときの処理です。
   */
  const onHeaderTitleClick = () => {
    // ページトップへ移動
    window.scrollTo(0, 0);
  };

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
          return b.date.replaceAll("-", "") - a.date.replaceAll("-", "");
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
    setDefaultReport(
      JSON.parse(
        JSON.stringify({
          ...DEFAULT_REPORT,
          date: format(selectedDate, "yyyy-MM-dd"),
        })
      )
    );
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
            return report.date.includes(date);
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

  /**
   * JSONファイルから日報をインポートする処理です。
   * @param {*} data
   */
  const importReportsFromJson = (data) => {
    // TODO: データのフォーマットが正しいか検証する処理を入れる？
    console.log(data);
    let additionalReports = [];
    // データの数だけ繰り返す
    for (let i = 0; i < data.length; i++) {
      let additionalReportItems = [];
      for (let j = 0; j < data[i].report_items.length; j++) {
        additionalReportItems.push({
          category: data[i].report_items[j].category,
          content: data[i].report_items[j].content,
          hour: data[i].report_items[j].hour,
          minute: data[i].report_items[j].minute,
        });
      }
      additionalReports.push({
        date: data[i].date,
        report_items: additionalReportItems,
        content: data[i].content,
        updatedAt: data[i].updatedAt,
      });
    }
    setReports((reports) => {
      let newReports = [...additionalReports, ...reports]
        // 重複を削除
        .filter(
          (element, index, array) =>
            array.findIndex((e) => e.date === element.date) === index
        )
        // 並べ替え
        .sort((a, b) => {
          return b.date.replaceAll("-", "") - a.date.replaceAll("-", "");
        });
      localStorage.setItem("reports", JSON.stringify(newReports));
      return newReports;
    });
  };

  /**
   * テキスト形式でエクスポートするボタンが押されたときの処理です。
   */
  const onExportReportsToTxtButtonClick = () => {
    exportReportsToTxt(reports);
  };

  /**
   * JSON形式でエクスポートするボタンが押されたときの処理です。
   */
  const onExportReportsToJsonButtonClick = () => {
    exportReportsToJson(reports);
  };

  return (
    <>
      {/* ドロワー */}
      <ResponsiveDrawer
        importReportsFromJson={importReportsFromJson}
        onHeaderTitleClick={onHeaderTitleClick}
        onExportReportsToTxtButtonClick={() =>
          onExportReportsToTxtButtonClick()
        }
        onExportReportsToJsonButtonClick={() =>
          onExportReportsToJsonButtonClick()
        }
      />
      <main className={classes.main}>
        {/* 画面切り替え */}
        <Switch>
          <Route exact path="/">
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
                <Typography
                  variant="h5"
                  className={classes.selectedDateReportHeading}
                >
                  {format(selectedDate, "yyyy.MM.dd")}の日報
                </Typography>
                {/* 選択した日に日報がなかったとき */}
                {reports.filter((report, index) => {
                  return report.date.includes(
                    format(selectedDate, "yyyy-MM-dd")
                  );
                }).length === 0 && (
                  <div className={classes.selectedDateReportNotFound}>
                    <Typography>日報はありません</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.createReportButton}
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={(event) => onCreateButtonClick(event)}
                    >
                      日報を作成する
                    </Button>
                  </div>
                )}
                {/* 選択した日に日報があったとき */}
                {reports.filter((report, index) => {
                  return report.date.includes(
                    format(selectedDate, "yyyy-MM-dd")
                  );
                }).length > 0 &&
                  reports.map((report, index) => {
                    if (
                      report.date.includes(format(selectedDate, "yyyy-MM-dd"))
                    ) {
                      return (
                        <div key={index} className={classes.reportCard}>
                          <ReportCard
                            report={report}
                            onEditButtonClick={() =>
                              onEditButtonClick(report.date)
                            }
                            onDeleteButtonClick={() =>
                              onDeleteButtonClick(report.date)
                            }
                          />
                        </div>
                      );
                    } else {
                      return <Fragment key={index}></Fragment>;
                    }
                  })}
              </div>
            </div>
            <Typography variant="h5" className={classes.reportsHeading}>
              日報一覧
            </Typography>
            {reports.map((report, index) => {
              return (
                <Fragment key={index}>
                  {report.date.includes(calendarMonth) && (
                    <div className={classes.reportCard}>
                      <ReportCard
                        className={classes.reportCard}
                        report={report}
                        onEditButtonClick={onEditButtonClick}
                        onDeleteButtonClick={onDeleteButtonClick}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
            {/* その月の日報がないとき→「日報がありません」と表示 */}
            {reports.filter((report, index) => {
              return report.date.includes(calendarMonth);
            }).length === 0 && (
              <div className={classes.monthReportNotFound}>
                日報がありません
              </div>
            )}
          </Route>
          <Route exact path="/analytics">
            <ReportAnalytics reports={reports} />
          </Route>
          <Route exact path="/about">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 1rem",
              }}
            >
              <h2>日報管理アプリ</h2>
              <Typography
                variant="caption"
                style={{ margin: "0 1rem", marginTop: "0.5rem" }}
              >
                ビルド時刻{" "}
                {format(
                  preval`module.exports = Date.now();`,
                  "yyyy/MM/dd HH:mm:ss"
                )}
              </Typography>
              <Tooltip title="GitHubのリポジトリを見る">
                <Link
                  href="https://github.com/ToshihiroWatanabe/daily-report-management"
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton size="small">
                    <GitHubIcon></GitHubIcon>
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
            <Typography
              component="p"
              style={{
                margin: "0 1rem",
              }}
            >
              Copyright © 2021 ワタナベトシヒロ All Rights Reserved.
            </Typography>
          </Route>
        </Switch>
      </main>
      {/* 日報入力ダイアログ */}
      <ReportFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        onCreate={onCreateReport}
        defaultReport={defaultReport}
        categories={categories}
      />
    </>
  );
};

export default App;
