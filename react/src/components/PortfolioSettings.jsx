import {
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const PortfolioSettings = () => {
  const [state, setState] = useContext(Context);
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
        <TextField
          variant="outlined"
          fullWidth
          value={state.reportId}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => {
                    // state.reportId.select();
                    document.execCommand("copy");
                  }}
                >
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Card>
    </>
  );
};

export default PortfolioSettings;
