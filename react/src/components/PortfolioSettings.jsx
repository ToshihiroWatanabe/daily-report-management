import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Context } from "../contexts/Context";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SimpleSnackbar from "./SimpleSnackbar";
import TagsInput from "./TagsInput";
import SyncIcon from "@material-ui/icons/Sync";
import { Link } from "react-router-dom";

const PortfolioSettings = () => {
  const [state, setState] = useContext(Context);
  const [skillSet, setSkillSet] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (state.userId === "") {
      document.getElementById("linkToHome").click();
    }
  }, []);

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

  const handleSelecetedTags = (items) => {
    console.log(items);
    setSkillSet(items);
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
        <Typography variant="h6">プロフィール設定</Typography>
        <Divider style={{ margin: "0.5rem 0" }} />
        <div style={{ width: "360px" }}>
          <Typography>名前</Typography>
          <TextField variant="outlined" fullWidth />
          <Typography>紹介文</Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            rowsMax={10}
            inputProps={{
              maxLength: "400",
            }}
            placeholder="自己アピールをどうぞ！"
          />
        </div>
        <Typography>スキルセット</Typography>
        <TagsInput
          selectedTags={handleSelecetedTags}
          fullWidth
          variant="outlined"
          id="tags"
          name="tags"
          placeholder="タグを入力してEnterで追加"
          // label="tags"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ marginTop: "1rem" }}
        >
          <SyncIcon />
          適用する
        </Button>
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
      <Link to="/" id="linkToHome" style={{ visibility: "hidden" }}>
        ホームに戻る
      </Link>
    </>
  );
};

export default PortfolioSettings;
