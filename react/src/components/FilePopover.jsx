import React, { useState, memo, useCallback } from "react";
import {
  ListItemText,
  makeStyles,
  Popover,
  IconButton,
  Avatar,
  Typography,
  Tooltip,
  Box,
  Button,
  Snackbar,
} from "@material-ui/core";
import "./FilePopover.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { DropzoneArea } from "material-ui-dropzone";
import AttachFileIcon from "@material-ui/icons/AttachFile";

/** Material-UIのスタイル */
const useStyles = makeStyles((theme) => ({}));

/**
 * アカウントアイコンメニューの関数コンポーネントです。
 */
const FilePopover = memo((props) => {
  /** Material-UIのスタイル */
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /**
   * アイコンがクリックされたときの処理です。
   * @param {*} event
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * ドロップゾーンのファイルに変更があったときの処理です。
   */
  const onDropzoneChange = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () =>
        console.error("ファイルの読み込みが中止されました");
      reader.onerror = () => console.error("ファイルの読み込みに失敗しました");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        const text = new Buffer(binaryStr, "base64");
        props.importReportsFromJson(JSON.parse(text));
        // Popoverを閉じる
        setAnchorEl(null);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  return (
    <>
      <Tooltip title="データの移行">
        <IconButton onClick={handleClick} color="inherit">
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
      <Popover
        disableScrollLock={true}
        id="filePopover"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
      >
        <DropzoneArea
          filesLimit={1}
          acceptedFiles={(["text/*"], ["application/json"])}
          onChange={(files) => onDropzoneChange(files)}
          maxFileSize={10_485_760}
          dropzoneText="JSONファイルから日報をインポート"
          showAlerts={false}
          showPreviewsInDropzone={false}
          Icon={() => {
            return (
              <>
                <AttachFileIcon />
              </>
            );
          }}
        />
        <Button
          onClick={props.onExportReportsToTxtButtonClick}
          variant="outlined"
          style={{ marginTop: "0.5rem" }}
        >
          テキスト形式でエクスポート
        </Button>
        <Button
          onClick={props.onExportReportsToJsonButtonClick}
          variant="outlined"
          style={{ marginTop: "0.5rem" }}
        >
          JSON形式でエクスポート
        </Button>
      </Popover>
    </>
  );
});

export default FilePopover;
