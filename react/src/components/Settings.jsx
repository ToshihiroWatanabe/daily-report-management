import React from "react";
import { Card, Typography } from "@material-ui/core";

const Settings = () => {
  return (
    <Card>
      Slack連携設定
      <Typography>Slack ユーザー名</Typography>
      <Typography>Slack チャンネル名</Typography>
      <Typography>Slack アクセストークン</Typography>
    </Card>
  );
};

export default Settings;
