import React, { memo, useContext } from "react";
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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Icon,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./ReportCard.css";
import slackMark from "../slackMark.svg";
import axios from "axios";
import { Context } from "../contexts/Context";

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
  imageIcon: {
    height: "150%",
    transform: "translate(-17.5%, -17.5%)",
  },
}));

/**
 * 日報カードのコンポーネントです。
 * @param {*} props
 * @returns
 */
const ReportCard = memo((props) => {
  const classes = useStyles();
  const [state, setState] = useContext(Context);

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

  /** Slackアイコンがクリックされたときの処理です。 */
  const onSlackIconClick = () => {
    console.log(process.env.REACT_APP_SLACK_WEBHOOK_URL);
    axios
      .post(
        process.env.REACT_APP_SLACK_WEBHOOK_URL,
        JSON.stringify({
          text: "Hello, World!",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((e) => console.log(e));
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
                {/* Slack投稿ボタン */}
                {state.slackAccessToken !== "" &&
                  state.slackChannelName !== "" && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        onSlackIconClick();
                      }}
                    >
                      <Icon>
                        <img
                          alt="slack"
                          src={slackMark}
                          className={classes.imageIcon}
                        />
                      </Icon>
                    </IconButton>
                  )}
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
              <Button onClick={handleClickOpen} color="primary">
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
                  <div style={{ marginRight: "1rem" }}>
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
          {/* 感想 */}
          <Typography variant="body2" component="p" className={classes.content}>
            {props.report.content}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.report.date.replaceAll("-", ".")}の日報を削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              props.onDeleteButtonClick(props.report.date);
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default ReportCard;
