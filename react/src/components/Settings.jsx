import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Context } from "../contexts/Context";
import SyncIcon from "@material-ui/icons/Sync";

const useStyles = makeStyles((theme) => ({
  slackTextField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const [state, setState] = useContext(Context);
  const [slackUserName, setSlackUserName] = useState(state.slackUserName);
  const [slackWebhookUrl, setSlackWebhookUrl] = useState(state.slackWebhookUrl);

  const onSlackUserNameChange = (event) => {
    setSlackUserName(event.target.value);
  };
  const onSlackWebhookUrlChange = (event) => {
    setSlackWebhookUrl(event.target.value);
  };
  const onApplyButtonClick = (event) => {
    event.preventDefault();
    setState({
      ...state,
      slackUserName: slackUserName,
      slackWebhookUrl: slackWebhookUrl,
    });
  };

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
      <form autoComplete="on">
        <TextField
          label="ユーザー名(任意)"
          name="slackUserName"
          variant="outlined"
          size="small"
          defaultValue={state.slackUserName}
          onChange={onSlackUserNameChange}
          className={classes.slackTextField}
        />
        <TextField
          label="Slack Webhook URL"
          name="slackWebhookUrl"
          variant="outlined"
          size="small"
          fullWidth
          defaultValue={state.slackWebhookUrl}
          onChange={onSlackWebhookUrlChange}
          className={classes.slackTextField}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={onApplyButtonClick}
        >
          <SyncIcon />
          適用する
        </Button>
      </form>
    </Card>
  );
};

export default Settings;
