import React, { useContext, useState } from "react";
import {
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Context } from "../contexts/Context";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SimpleSnackbar from "./SimpleSnackbar";

const PortfolioSettings = () => {
  const [state, setState] = useContext(Context);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onClipBoardButtonClick = () => {
    // 一時的に要素を追加
    let textArea = document.createElement("textarea");
    textArea.innerHTML = document.location.href + "/" + state.reportId;
    textArea.id = "copyArea";
    document.getElementById("root").appendChild(textArea);
    textArea.select(document.getElementById("copyArea"));
    document.execCommand("Copy");
    document.getElementById("copyArea").remove();
    setSnackbarOpen(true);
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
          value={document.location.href + "/" + state.reportId}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small" onClick={onClipBoardButtonClick}>
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SimpleSnackbar
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          message="URLをコピーしました！"
        />
      </Card>
    </>
  );
};

export default PortfolioSettings;
