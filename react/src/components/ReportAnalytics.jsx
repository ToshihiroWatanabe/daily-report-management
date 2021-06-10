import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, Chip, Tooltip, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { Fragment } from "react";

const COLORS = [
  "#e57373", // Red 300
  "#ffa726", // Orange 400
  "#fdd835", // Yellow 600
  "#d4e157", // Lime 400
  "#66bb6a", // Green 400
  "#42a5f5", // Blue 400
  "#7986cb", // Indigo 300
  "#ab47bc", // Purple 400
];

const pv = 2400;
const amt = 2400;

const useStyles = makeStyles((theme) => ({
  categoryCard: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  leftColumn: {},
  rightColumn: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  categoryChip: {
    width: "5.1rem",
    marginRight: "2px",
  },
}));

const renderColorfulLegendText = (value, entry) => {
  return <span style={{ color: "#000" }}>{value}</span>;
};

/**
 * 日報の分析レポートのコンポーネントです。
 * @param {*} props
 * @returns
 */
const ReportAnalytics = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  /** 月ごとの日報登録日数 */
  let nonStateNumberOfReportPerMonth = [];
  /** 月ごとの総合学習時間 */
  let nonStateTotalMinutePerMonth = [];
  let nonStateTotalHourPerMonth = [];
  /** 総合学習時間 */
  let nonStateTotalMinutePerYear = 0;
  let nonStateTotalHourPerYear = 0;
  /** カテゴリー別の学習時間 */
  let nonStateTotalMinuteByCategory = [];
  let nonStateTotalHourByCategory = [];

  const [numberOfCategory, setNumberOfCategory] = useState(7);

  // 直近12ヶ月
  for (let i = 11; i >= 0; i--) {
    const now = new Date();
    let month = format(now.setMonth(now.getMonth() - i), "yyyy-MM");
    let uv = 0;
    let localTotalMinute = 0;
    // 日報数だけ繰り返す
    for (let j = 0; j < props.reports.length; j++) {
      if (props.reports[j].date.includes(month)) {
        uv++;
        // タスク数だけ繰り返す
        for (let k = 0; k < props.reports[j].report_items.length; k++) {
          localTotalMinute +=
            props.reports[j].report_items[k].hour * 60 +
            props.reports[j].report_items[k].minute;
          // 新しいカテゴリーであれば追加、既存のカテゴリーであれば加算
          let isCategoryAlreadyExist = false;
          for (let n = 0; n < nonStateTotalMinuteByCategory.length; n++) {
            if (
              props.reports[j].report_items[k].category ===
              nonStateTotalMinuteByCategory[n].category
            ) {
              isCategoryAlreadyExist = true;
              nonStateTotalMinuteByCategory[n].uv +=
                props.reports[j].report_items[k].hour * 60 +
                props.reports[j].report_items[k].minute;
            }
            if (isCategoryAlreadyExist === true) {
              break;
            }
          }
          // 新しいカテゴリーの場合
          if (!isCategoryAlreadyExist) {
            nonStateTotalMinuteByCategory.push({
              category: props.reports[j].report_items[k].category,
              uv:
                props.reports[j].report_items[k].hour * 60 +
                props.reports[j].report_items[k].minute,
              pv: pv,
              amt: amt,
            });
          }
        }
      }
    }
    nonStateNumberOfReportPerMonth.push({
      month: month.replace("-", "/"),
      // uv: Math.floor(31 * Math.random()),
      uv: uv,
      pv: pv,
      amt: amt,
    });
    nonStateTotalMinutePerMonth.push({
      month: month.replace("-", "/"),
      uv: localTotalMinute,
      pv: pv,
      amt: amt,
    });
    nonStateTotalMinutePerYear += localTotalMinute;
  }
  // 分から時に変換
  for (let i = 0; i < nonStateTotalMinutePerMonth.length; i++) {
    nonStateTotalHourPerMonth.push({
      month: nonStateTotalMinutePerMonth[i].month.replace("-", "/"),
      uv: Math.floor(nonStateTotalMinutePerMonth[i].uv / 60),
      pv: pv,
      amt: amt,
    });
  }
  nonStateTotalHourPerYear = Math.floor(nonStateTotalMinutePerYear / 60);
  // 時間の長い順に並べ替え
  nonStateTotalMinuteByCategory.sort((a, b) => {
    return b.uv - a.uv;
  });
  for (let i = 0; i < nonStateTotalMinuteByCategory.length; i++) {
    nonStateTotalHourByCategory.push({
      category: nonStateTotalMinuteByCategory[i].category,
      uv: Math.floor(nonStateTotalMinuteByCategory[i].uv / 60),
      pv: pv,
      amt: amt,
    });
  }

  const [numberOfReportPerMonth] = useState(nonStateNumberOfReportPerMonth);
  const [totalHourPerMonth] = useState(nonStateTotalHourPerMonth);
  const [totalHourPerYear] = useState(nonStateTotalHourPerYear);
  const [totalHourByCategory] = useState(nonStateTotalHourByCategory);

  return (
    <>
      <Card
        style={{
          width: "95%",
          padding: "1rem",
          marginLeft: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h5">日報投稿日数</Typography>
        <ResponsiveContainer height={300}>
          <BarChart
            width={600}
            height={300}
            data={numberOfReportPerMonth}
            margin={{ top: 30 }}
          >
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
            <CartesianGrid stroke="#EEE" strokeDasharray="1 0" />
            <XAxis dataKey="month"></XAxis>
            <YAxis
              type="number"
              domain={[0, 31]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              label={{ value: "単位(日)", position: "top" }}
            />
            <Bar dataKey="uv" barSize={30} fill={theme.palette.primary.main}>
              <LabelList dataKey="uv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card
        style={{
          width: "95%",
          padding: "1rem",
          marginLeft: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h5" style={{ marginBottom: "8px" }}>
          総合学習時間
        </Typography>
        <ResponsiveContainer height={300}>
          <BarChart
            width={600}
            height={300}
            data={totalHourPerMonth}
            margin={{ top: 30 }}
          >
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
            <CartesianGrid stroke="#EEE" strokeDasharray="1 0" />
            <XAxis dataKey="month"></XAxis>
            <YAxis
              type="number"
              label={{ value: "単位(時間)", position: "top", dx: 4, dy: -8 }}
            />
            <Bar dataKey="uv" barSize={30} fill={theme.palette.primary.main}>
              <LabelList dataKey="uv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          総合学習時間: {totalHourPerYear}時間
          <Typography variant="caption">(直近12ヶ月)</Typography>
        </Typography>
      </Card>
      <Card
        style={{
          width: "95%",
          padding: "1rem",
          marginLeft: "1rem",
        }}
        className={classes.categoryCard}
      >
        <div className={classes.leftColumn}>
          <Typography variant="h5" style={{ marginBottom: "1rem" }}>
            カテゴリー別学習比率{" "}
            <Typography variant="caption">(直近12ヶ月)</Typography>
          </Typography>
          {totalHourByCategory
            .filter((value, index) => {
              return index < numberOfCategory;
            })
            .map((value, index) => (
              <Fragment key={index}>
                <div style={{ margin: "0.5rem" }}>
                  <Typography
                    style={{ display: "inline-block", marginRight: "0.5rem" }}
                  >
                    {index + 1}位
                  </Typography>
                  <Tooltip title={value.category} placement="top">
                    <Chip
                      label={value.category}
                      color="secondary"
                      size="small"
                      className={classes.categoryChip}
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                  </Tooltip>
                  {value.uv}時間(
                  {Math.floor((value.uv / totalHourPerYear) * 100)}
                  %)
                </div>
              </Fragment>
            ))}
        </div>
        <div className={classes.rightColumn}>
          <PieChart width={300} height={250}>
            <Pie
              data={totalHourByCategory}
              dataKey="uv"
              nameKey="vategory"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              startAngle={90}
              endAngle={-270}
            >
              {totalHourByCategory
                .filter((value, index) => {
                  return index < numberOfCategory;
                })
                .map((item, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              height={50}
              payload={totalHourByCategory
                .filter((value, index) => {
                  return index < numberOfCategory;
                })
                .map((item, index) => ({
                  id: item.name,
                  type: "square",
                  value: `${item.category}`,
                  color: COLORS[index % COLORS.length],
                }))}
              formatter={renderColorfulLegendText}
            />
          </PieChart>
        </div>
      </Card>
    </>
  );
};

export default ReportAnalytics;
