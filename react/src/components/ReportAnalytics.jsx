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

  /** 日報登録日数 */
  const [numberOfReportPerMonth, setNumberOfReportPerMonth] = useState(() => {
    let data = [];
    // 直近12ヶ月
    for (let i = 11; i >= 0; i--) {
      const now = new Date();
      let month = format(now.setMonth(now.getMonth() - i), "yyyy-MM");
      let uv = 0;
      for (let j = 0; j < props.reports.length; j++) {
        if (props.reports[j].date.includes(month)) {
          uv++;
        }
      }
      data.push({
        month: month.replace("-", "/"),
        // uv: Math.floor(31 * Math.random()),
        uv: uv,
        pv: pv,
        amt: amt,
      });
    }
    // 代入
    return data;
  });

  return (
    <Card style={{ width: "95%", padding: "1rem", marginLeft: "1rem" }}>
      <Typography>日報投稿日数</Typography>
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
  );
};

export default ReportAnalytics;
