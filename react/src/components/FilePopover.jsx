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

  const customGetFileLimitExceedMessage = (filesLimit) => {
    return "ファイルの最大数は" + filesLimit + "つまでです。";
  };

  const customGetFileAddedMessage = (fileName) => {
    return fileName + "が追加されました。";
  };

  const customGetFileRemovedMessage = (fileName) => {
    return fileName + "が削除されました。";
  };

  const convertBytesToMbsOrKbs = (filesize) => {
    let size = "";
    if (filesize >= 1048576) {
      size = filesize / 1048576 + "MB";
    } else if (filesize >= 1024) {
      size = filesize / 1024 + "KB";
    } else {
      size = filesize + "バイト";
    }
    return size;
  };

  const customGetDropRejectMessage = (
    rejectedFile,
    acceptedFiles,
    maxFileSize
  ) => {
    let message = `${rejectedFile.name}はアップロードできません。`;
    if (!acceptedFiles.includes(rejectedFile.type)) {
      message += "この拡張子はサポートされていません。";
    }
    if (rejectedFile.size > maxFileSize) {
      message +=
        "サイズは最大" + convertBytesToMbsOrKbs(maxFileSize) + "までです。";
    }
    return message;
  };

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
          dropzoneText="ファイルから日報をインポート"
          getFileLimitExceedMessage={customGetFileLimitExceedMessage}
          getFileAddedMessage={customGetFileAddedMessage}
          getFileRemovedMessage={customGetFileRemovedMessage}
          getDropRejectMessage={customGetDropRejectMessage}
          showPreviewsInDropzone={false}
          Icon={() => {
            return (
              <>
                <AttachFileIcon />
              </>
            );
          }}
        />
      </Popover>
    </>
  );
});

export default FilePopover;
