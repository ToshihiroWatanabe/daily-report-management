import React, { memo, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import "./AccountPopover.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";

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
        <Typography style={{ padding: "1rem 1rem 0 1rem" }}>
          ログインしていません
        </Typography>
        <List>
          <Link
            onClick={handleClose}
            to="/settings"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="設定" />
            </ListItem>
          </Link>
        </List>
      </Popover>
    </>
  );
});

export default AccountPopover;
