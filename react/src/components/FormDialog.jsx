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
import { FormControl, IconButton } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) =>
  createStyles({
    dFlex: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default function FormDialog(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
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
            {new Date().toLocaleDateString()}
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
                disableClearable
                options={hours}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    defaultValue="1"
                    margin="dense"
                    style={{ width: "2rem", marginRight: "4px" }}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
            </FormControl>
            <div>時間</div>
            <FormControl>
              <TextField
                defaultValue="0"
                margin="dense"
                style={{ width: "2rem", marginRight: "4px" }}
                inputProps={{ style: { textAlign: "right" } }}
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

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];