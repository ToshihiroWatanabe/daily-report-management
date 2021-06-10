import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  LabelList,
} from "recharts";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { nextWednesday } from "date-fns";

const pv = 2400;
const amt = 2400;

const useStyles = makeStyles((theme) => ({}));

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

  const [numberOfReportPerMonth, setNumberOfReportPerMonth] = useState(
    nonStateNumberOfReportPerMonth
  );
  const [totalHourPerMonth, setTotalHourPerMonth] = useState(
    nonStateTotalHourPerMonth
  );
  const [totalHourPerYear, setTotalHourPerYear] = useState(
    nonStateTotalHourPerYear
  );

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
          年間学習時間: {totalHourPerYear}時間
        </Typography>
      </Card>
    </>
  );
};

export default ReportAnalytics;
