import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FormControl, IconButton, Popper } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) =>
  createStyles({
    dFlex: {
      display: "flex",
      alignItems: "center",
    },
  })
);

let hours = [];
for (let i = 0; i <= 24; i++) {
  hours.push({ label: i.toString(), value: i });
}

let minutes = [];
minutes.push({ label: "0", value: 0 });
minutes.push({ label: "15", value: 15 });
minutes.push({ label: "30", value: 30 });
minutes.push({ label: "45", value: 45 });
for (let i = 0; i <= 59; i++) {
  minutes.push({ label: i.toString(), value: i });
}

export default function FormDialog(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const PopperMy = function (props) {
    return (
      <Popper {...props} style={{ width: "4rem" }} placement="bottom-start" />
    );
  };

  return (
    <div>
      <Dialog
        open={props.open}
        // 別の場所をクリックした時
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">日報作成</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.selectedDate.toLocaleDateString()}
          </DialogContentText>
          <div className={classes.dFlex}>
            <TextField
              autoFocus
              label="カテゴリ"
              variant="outlined"
              margin="dense"
              style={{ width: "8rem", marginRight: "4px" }}
            />
            <TextField
              label="内容"
              variant="outlined"
              margin="dense"
              style={{ width: "12rem", marginRight: "4px" }}
            />
            <FormControl>
              <Autocomplete
                freeSolo
                disableClearable // バツマークを無効にする
                PopperComponent={PopperMy}
                options={hours}
                getOptionLabel={(option) => option.label}
                defaultValue={{ label: "1", value: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    style={{
                      width: "2rem",
                      marginRight: "4px",
                    }}
                    inputProps={{
                      ...params.inputProps,
                      maxLength: 2,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
            </FormControl>
            <div>時間</div>
            <FormControl>
              <Autocomplete
                freeSolo
                disableClearable // バツマークを無効にする
                PopperComponent={PopperMy}
                options={minutes}
                getOptionLabel={(option) => option.label}
                defaultValue={{ label: "0", value: 0 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    style={{
                      width: "2rem",
                      marginRight: "4px",
                    }}
                    inputProps={{
                      ...params.inputProps,
                      maxLength: 2,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
            </FormControl>
            <div>分</div>
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <TextField
            margin="dense"
            id="name"
            label="感想"
            type="text"
            placeholder="ここに感想を残せます"
            multiline
            rows={8}
            rowsMax={8}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
