import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { IconButton, InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const USER_ID_LENGTH_MIN = 5;
const USER_ID_LENGTH_MAX = 32;
const PASSWORD_LENGTH_MIN = 12;
const PASSWORD_LENGTH_MAX = 100;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {"日報管理アプリ "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [formValue, setFormValue] = useState({ userId: "", password: "" });
  const [userIdHelperText, setUserIdHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  /** ユーザーIDの入力値に変化があったときの処理です。 */
  const onUserIdChange = (event) => {
    setFormValue({ ...formValue, userId: event.target.value });
  };

  const onUserIdBlur = (event) => {
    let helperText = "";
    if (event.target.value.length < USER_ID_LENGTH_MIN) {
      helperText = USER_ID_LENGTH_MIN + "文字以上にしてください";
    }
    if (event.target.value.length > USER_ID_LENGTH_MAX) {
      helperText = USER_ID_LENGTH_MAX + "文字以内にしてください";
    }
    if (!event.target.value.match(/^[a-zA-Z0-9_-]*$/)) {
      helperText = "使用できるのは半角英数字とハイフンとアンダーバーだけです。";
    }
    if (event.target.value === "") {
      helperText = "";
    }
    setUserIdHelperText(helperText);
    setFormValue({ ...formValue, userId: event.target.value });
  };

  /** パスワードの入力値に変化があったときの処理です。 */
  const onPasswordChange = (event) => {
    setFormValue({ ...formValue, password: event.target.value });
  };

  const onPasswordBlur = (event) => {
    let helperText = "";
    if (event.target.value.length < PASSWORD_LENGTH_MIN) {
      helperText = PASSWORD_LENGTH_MIN + "文字以上にしてください";
    }
    if (event.target.value.length > PASSWORD_LENGTH_MAX) {
      helperText = PASSWORD_LENGTH_MAX + "文字以内にしてください";
    }
    if (
      !event.target.value.match(/^[a-zA-Z0-9!"#$%&'(){}+;@`:/?.>,<^~|*_\\-]*$/)
    ) {
      helperText = "使用できるのは半角英数字記号だけです。";
    }
    if (event.target.value === "") {
      helperText = "";
    }
    setPasswordHelperText(helperText);
    setFormValue({ ...formValue, password: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={userIdHelperText !== ""}
            helperText={userIdHelperText}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="ユーザーID"
            name="userId"
            autoComplete="userId"
            value={formValue.userId}
            onChange={onUserIdChange}
            onBlur={onUserIdBlur}
            autoFocus
          />
          <TextField
            error={passwordHelperText !== ""}
            helperText={passwordHelperText}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formValue.password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ログイン
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/#/signup" variant="body2">
                {"新規登録はこちら"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
  );
}
