import React, { useState, useEffect, memo } from "react";
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

  return (
    <>
      <Tooltip title="データの移行">
        <IconButton onClick={handleClick} color="inherit">
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
      <Popover
        disableScrollLock={true}
        id="accountPopover"
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
        <Box m={2}></Box>
      </Popover>
    </>
  );
});

export default FilePopover;
