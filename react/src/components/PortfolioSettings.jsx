import { Card, Typography } from "@material-ui/core";
import React from "react";

const PortfolioSettings = () => {
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
        <Typography>名前</Typography>
        <Typography>紹介文</Typography>
        <Typography>スキルセット</Typography>
      </Card>
      <Card
        style={{
          width: "95%",
          padding: "1rem",
          marginLeft: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Typography>ポートフォリオ公開URL</Typography>
      </Card>
    </>
  );
};

export default PortfolioSettings;
