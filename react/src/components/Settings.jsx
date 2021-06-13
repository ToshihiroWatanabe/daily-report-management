import React, { useContext } from "react";
import { Card, makeStyles, TextField, Typography } from "@material-ui/core";
import { Context } from "../contexts/Context";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const [state, setState] = useContext(Context);
  return (
    <Card
      style={{
        width: "95%",
        padding: "1rem",
        marginLeft: "1rem",
        marginBottom: "1rem",
      }}
    >
      Slack連携設定
      <div className={classes.form}>
        <TextField
          label="Slack ユーザー名"
          variant="outlined"
          size="small"
          value={state.slackUserName}
          onChange={(e) =>
            setState({ ...state, slackUserName: e.target.value })
          }
        />
      </div>
      <div className={classes.form}>
        <TextField
          label="Slack チャンネル名"
          variant="outlined"
          size="small"
          value={state.slackChannelName}
          onChange={(e) =>
            setState({ ...state, slackChannelName: e.target.value })
          }
        />
      </div>
      <div className={classes.form}>
        <TextField
          label="Slack アクセストークン"
          variant="outlined"
          size="small"
          value={state.slackAccessToken}
          onChange={(e) =>
            setState({ ...state, slackAccessToken: e.target.value })
          }
        />
      </div>
    </Card>
  );
};

export default Settings;
