import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function ReportCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.report.date.replaceAll("-", ".")}
        </Typography>
        {/* <Typography variant="h5" component="h2">
          タイトル
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
        <Typography variant="body1" component="h2">
          {props.report.report_items.map((reportItem, reportItemIndex) => {
            return (
              <div key={reportItemIndex} className={classes.reportItem}>
                <div style={{ marginRight: "1rem" }}>
                  <Chip
                    label={reportItem.category}
                    color="secondary"
                    size="small"
                    className={classes.categoryChip}
                  />
                  {reportItem.content}
                </div>
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
      <CardActions>
        <Button onClick={() => props.onEditButtonClick(props.report.date)}>
          <EditIcon fontSize="inherit" />
          編集
        </Button>
        <Button onClick={() => props.onDeleteButtonClick(props.report.date)}>
          <DeleteIcon fontSize="inherit" />
          削除
        </Button>
      </CardActions>
    </Card>
  );
}
