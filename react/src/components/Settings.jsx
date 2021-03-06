import React, { useContext, useEffect, useState } from "react";
import { Button, Card, makeStyles, TextField } from "@material-ui/core";
import { Context } from "../contexts/Context";
import SyncIcon from "@material-ui/icons/Sync";
import SettingService from "../service/setting.service";
import SimpleSnackbar from "./SimpleSnackbar";

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
  const [settingDisabled, setSettingDisabled] = useState(
    state.userId === "" ? false : true
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (state.userId !== "") {
      SettingService.findByUserId(state.userId, state.password).then(
        (response) => {
          console.log(response);
          if (response.data) {
            setSettingDisabled(false);
          }
        }
      );
    }
  }, []);

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
    if (state.userId !== "") {
      SettingService.update(
        state.userId,
        state.password,
        JSON.stringify({
          slackUserName: slackUserName,
          slackWebhookUrl: slackWebhookUrl,
        })
      ).then((response) => {
        console.log(response);
        if (response.data) {
          // 適用しましたスナックバーを出す
          setSnackbarOpen(true);
        }
      });
    }
  };

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
            disabled={settingDisabled}
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
            disabled={settingDisabled}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onApplyButtonClick}
            disabled={settingDisabled}
          >
            <SyncIcon />
            適用する
          </Button>
          {state.userId === "" && (
            <>
              ※ログインしていない場合、この設定はページをリロードするとリセットされます。
            </>
          )}
        </form>
      </Card>
      <SimpleSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message="適用しました！"
      />
    </>
  );
};

export default Settings;
