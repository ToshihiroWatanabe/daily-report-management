import React from "react";
import { Card, Typography } from "@material-ui/core";

const Settings = () => {
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
      <Typography>Slack ユーザー名</Typography>
      <Typography>Slack チャンネル名</Typography>
      <Typography>Slack アクセストークン</Typography>
    </Card>
  );
};

export default Settings;
