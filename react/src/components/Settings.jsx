import React from "react";
import { Card, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Settings = () => {
  const classes = useStyles();
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
        <TextField label="Slack ユーザー名" variant="outlined" size="small" />
      </div>
      <div className={classes.form}>
        <TextField label="Slack チャンネル名" variant="outlined" size="small" />
      </div>
      <div className={classes.form}>
        <TextField
          label="Slack アクセストークン"
          variant="outlined"
          size="small"
        />
      </div>
    </Card>
  );
};

export default Settings;
