import React, { memo, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import "./AccountPopover.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0.5rem 1rem",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const AccountPopover = memo(() => {
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
        <Link onClick={handleClose} to="/login" className={classes.link}>
          <Button className={classes.button} variant="outlined" size="small">
            <ListItemText primary="ログイン" />
          </Button>
        </Link>
        <Link onClick={handleClose} to="/signup" className={classes.link}>
          <Button className={classes.button} variant="outlined" size="small">
            <ListItemText primary="新規登録" />
          </Button>
        </Link>
        <List>
          <Link onClick={handleClose} to="/settings" className={classes.link}>
            <Button className={classes.button} variant="outlined" size="small">
              <SettingsIcon />
              <ListItemText primary="設定" />
            </Button>
          </Link>
        </List>
      </Popover>
    </>
  );
});

export default AccountPopover;
