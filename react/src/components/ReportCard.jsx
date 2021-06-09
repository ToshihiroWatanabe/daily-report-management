import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  Tooltip,
  Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: "30rem",
    [theme.breakpoints.down("sm")]: { width: 500, maxWidth: "85vw" },
    [theme.breakpoints.up("md")]: { width: "30rem" },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  reportItem: {
    display: "flex",
  },
  categoryChip: {
    width: "5.1rem",
    marginRight: "2px",
  },
  time: {
    marginLeft: "auto",
  },
  content: {
    fontSize: "0.75rem",
  },
}));

/**
 * 日報カードのコンポーネントです。
 * @param {*} props
 * @returns
 */
export default function ReportCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "-2px" }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {props.report.date.replaceAll("-", ".")}
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
        <Typography variant="body2" component="p" className={classes.content}>
          {props.report.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
