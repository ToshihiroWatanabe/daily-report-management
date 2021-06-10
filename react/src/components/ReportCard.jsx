import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  Tooltip,
  Chip,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./ReportCard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: "30rem",
    [theme.breakpoints.down("sm")]: {
      width: 500,
      maxWidth: "85vw",
      marginBottom: "-12px",
    },
    [theme.breakpoints.up("md")]: { width: "30rem" },
  },
  title: {
    fontSize: 14,
  },
  reportItem: {
    display: "flex",
    margin: "0.2rem 0",
  },
  categoryChip: {
    width: "5.1rem",
    marginRight: "0.5rem",
    marginTop: "-0.2rem",
  },
  time: {
    marginLeft: "auto",
  },
  content: {
    fontSize: "0.75rem",
    whiteSpace: "pre-line",
  },
}));

/**
 * 日報カードのコンポーネントです。
 * @param {*} props
 * @returns
 */
const ReportCard = memo((props) => {
  const classes = useStyles();

  /**
   * ツイートするボタンがクリックされたときの処理です。
   */
  const onTweetButtonClick = () => {
    let url =
      "https://twitter.com/intent/tweet?text=🌟" +
      props.report.date.replaceAll("-", ".") +
      "%0A%0A💡やったこと%0A";
    let totalMinute = 0;
    for (let i = 0; i < props.report.report_items.length; i++) {
      url +=
        "《" +
        props.report.report_items[i].category +
        "》" +
        props.report.report_items[i].content +
        "%0A";
      totalMinute +=
        props.report.report_items[i].hour * 60 +
        props.report.report_items[i].minute;
    }
    url +=
      "%0A計: " +
      Math.floor(totalMinute / 60) +
      "時間" +
      (totalMinute % 60) +
      "分%0A%0A";
    url += "✍️感想%0A" + props.report.content;
    window.open(url);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div style={{ display: "flex", AlignItems: "center" }}>
          <div style={{ marginTop: "-0.3rem" }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {props.report.date.replaceAll("-", ".")}
              {/* ツイートするボタン */}
              {/* <Link
                href={
                  "https://twitter.com/intent/tweet?text=🌟" +
                  props.report.date.replaceAll("-", ".") +
                  "%0A%0A💡やったこと%0A"
                }
                target="_blank"
                rel="noopener"
              > */}
              <IconButton
                size="small"
                onClick={() => onTweetButtonClick()}
                style={{
                  display: "inline-block",
                  marginTop: "-0.2rem",
                  marginLeft: "0.2rem",
                }}
              >
                <TwitterIcon color="primary" />
              </IconButton>
              {/* </Link> */}
            </Typography>
          </div>
          <div style={{ marginLeft: "auto", marginTop: "-10px" }}>
            <Button
              onClick={() => props.onEditButtonClick(props.report.date)}
              style={{ color: "#ff9800" }}
              color="inherit"
            >
              <EditIcon fontSize="inherit" />
              編集
            </Button>
            <Button
              onClick={() => props.onDeleteButtonClick(props.report.date)}
              color="primary"
            >
              <DeleteIcon fontSize="inherit" />
              削除
            </Button>
          </div>
        </div>
        <Typography variant="body1" component="h2">
          {props.report.report_items.map((reportItem, reportItemIndex) => {
            return (
              <div key={reportItemIndex} className={classes.reportItem}>
                <div>
                  <Tooltip title={reportItem.category} placement="top">
                    <Chip
                      label={reportItem.category}
                      color="secondary"
                      size="small"
                      className={classes.categoryChip}
                    />
                  </Tooltip>
                </div>
                <div style={{ marginRight: "1rem" }}>{reportItem.content}</div>
                <div className={classes.time}>
                  {reportItem.hour}:
                  {reportItem.minute >= 10
                    ? reportItem.minute
                    : "0" + reportItem.minute}
                </div>
              </div>
            );
          })}
        </Typography>
        <Divider style={{ margin: "0.5rem 0" }} />
        {/* 感想 */}
        <Typography variant="body2" component="p" className={classes.content}>
          {props.report.content}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default ReportCard;
