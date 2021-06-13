import React, { memo, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IconButton, Popover, Tooltip } from "@material-ui/core";
import "./AccountPopover.css";

const AccountPopover = memo(() => {
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
      <Tooltip title="アカウントメニュー">
        <IconButton onClick={handleClick} color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Popover
        disableScrollLock={true}
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
        ログインしていません
      </Popover>
    </>
  );
});

export default AccountPopover;
