import React, { memo, useContext, useState } from "react";
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
  Snackbar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./ReportCard.css";
import slackMark from "../slackMark.svg";
import axios from "axios";
import { Context } from "../contexts/Context";
import Alert from "@material-ui/lab/Alert";

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

  const [open, setOpen] = React.useState(false);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    let text = state.slackUserName + "\n\n";
    text +=
      "🌟*" + props.report.date.replaceAll("-", ".") + "*\n\n💡*やったこと*\n";
    let totalMinute = 0;
    for (let i = 0; i < props.report.report_items.length; i++) {
      text +=
        "《" +
        props.report.report_items[i].category +
        "》" +
        props.report.report_items[i].content +
        "\n";
      totalMinute +=
        props.report.report_items[i].hour * 60 +
        props.report.report_items[i].minute;
    }
    text +=
      "\n*計: " +
      Math.floor(totalMinute / 60) +
      "時間" +
      (totalMinute % 60) +
      "分*\n\n";
    text += "✍️*感想*\n" + props.report.content;
    axios
      .post(
        state.slackWebhookUrl,
        JSON.stringify({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: text,
              },
            },
          ],
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Slackに投稿しました");
        setSuccessSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Slackへの投稿に失敗しました");
        setSuccessSnackbarOpen(true);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
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
                <Tooltip title="ツイートする">
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
                </Tooltip>
                {/* Slack投稿ボタン */}
                {state.slackWebhookUrl !== "" && (
                  <Tooltip title="Slackに投稿する">
                    <IconButton
                      size="small"
                      onClick={() => {
                        onSlackIconClick();
                      }}
                      style={{ marginBottom: "0.2rem" }}
                    >
                      <Icon>
                        <img
                          alt="slack"
                          src={slackMark}
                          className={classes.imageIcon}
                        />
                      </Icon>
                    </IconButton>
                  </Tooltip>
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
      <Snackbar
        open={successSnackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={(event, reason) => handleSuccessSnackbarClose(event, reason)}
      >
        <Alert
          onClose={(event, reason) => handleSuccessSnackbarClose(event, reason)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
});

export default ReportCard;
