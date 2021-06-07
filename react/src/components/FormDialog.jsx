import React, { useCallback, useState } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";

const useStyles = makeStyles((theme) =>
  createStyles({
    dFlex: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const hours = [];
for (let i = 0; i <= 24; i++) {
  hours.push({ label: i.toString(), value: i });
}

const minutes = [];
minutes.push({ label: "0", value: 0 });
minutes.push({ label: "15", value: 15 });
minutes.push({ label: "30", value: 30 });
minutes.push({ label: "45", value: 45 });
for (let i = 0; i <= 59; i++) {
  minutes.push({ label: i.toString(), value: i });
}

const DEFAULT_REPORT_ITEM = {
  category: "",
  content: "",
  hour: 1,
  minute: 0,
};

export default function FormDialog(props) {
  const classes = useStyles();

  const [reportItems, setReportItems] = useState([DEFAULT_REPORT_ITEM]);

  const onCancelButtonClick = () => {
    props.setOpen(false);
    setReportItems((reportItems) => {
      const copy = [DEFAULT_REPORT_ITEM];
      return [...copy];
    });
  };

  const onCreateButtonClick = () => {
    props.setOpen(false);
    let input = {
      date: format(props.selectedDate, "yyyy-MM-dd"),
      content: "",
      report_items: [DEFAULT_REPORT_ITEM],
      updatedAt: 0,
    };
    setReportItems((reportItems) => {
      const copy = [DEFAULT_REPORT_ITEM];
      return [...copy];
    });
    props.onCreate(input);
  };

  /**
   * 追加ボタンがクリックされたときの処理です。
   */
  const onAddButtonClick = () => {
    setReportItems([...reportItems, DEFAULT_REPORT_ITEM]);
  };

  /**
   * 削除ボタンがクリックされたときの処理です。
   * @param {*} index
   */
  const onDeleteButtonClick = (index) => {
    setReportItems((reportItems) => {
      return reportItems.filter((e, i) => {
        return i !== index;
      });
    });
  };

  /**
   * カテゴリーに変化があったときの処理です。
   * @param {*} index
   * @param {*} target
   */
  const onCategoryChange = (index, target) => {
    // console.log(index, value);
    setReportItems((reportItems) => {
      // reportItems[index].category = target.value;
      reportItems[index] = { ...reportItems[index], category: target.value };
      // console.log(reportItems);
      return [...reportItems];
    });
  };

  /**
   * 内容に変化があったときの処理です。
   * @param {*} index
   * @param {*} target
   */
  const onItemContentChange = (index, target) => {
    // console.log(index, value);
    setReportItems((reportItems) => {
      // reportItems[index].category = target.value;
      reportItems[index] = { ...reportItems[index], content: target.value };
      // console.log(reportItems);
      return [...reportItems];
    });
  };

  /**
   * 時間に変化があったときの処理です。
   * @param {*} index
   * @param {*} value
   */
  const onHourChange = (index, value) => {
    console.log(index, value);
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
          {reportItems.map((value, index) => {
            return (
              <div key={index} className={classes.dFlex}>
                <TextField
                  autoFocus
                  label="カテゴリ"
                  variant="outlined"
                  margin="dense"
                  value={reportItems[index].category}
                  onChange={(e, v) => onCategoryChange(index, e.target)}
                  style={{ width: "8rem", marginRight: "4px" }}
                />
                <TextField
                  label="内容"
                  variant="outlined"
                  margin="dense"
                  onChange={(e, v) => onItemContentChange(index, e.target)}
                  style={{ width: "12rem", marginRight: "4px" }}
                />
                {/* 時間 */}
                <FormControl>
                  <Autocomplete
                    freeSolo
                    disableClearable // バツマークを無効にする
                    PopperComponent={PopperMy}
                    options={hours}
                    getOptionLabel={(option) => option.label}
                    defaultValue={{
                      label: reportItems[index].hour.toString(),
                      value: reportItems[index].hour,
                    }}
                    onChange={(e, v) => onHourChange(index, v.value)}
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
                {/* 分 */}
                <FormControl>
                  <Autocomplete
                    freeSolo
                    disableClearable // バツマークを無効にする
                    PopperComponent={PopperMy}
                    options={minutes}
                    getOptionLabel={(option) => option.label}
                    defaultValue={{
                      label: reportItems[index].minute.toString(),
                      value: reportItems[index].minute,
                    }}
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
                <IconButton
                  style={{
                    visibility: reportItems.length > 16 ? "hidden" : "",
                  }}
                  onClick={onAddButtonClick}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton
                  style={{ visibility: reportItems.length < 2 ? "hidden" : "" }}
                  onClick={(event) => onDeleteButtonClick(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}

          {/* 感想 */}
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
          <Button onClick={onCancelButtonClick} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={onCreateButtonClick}
            variant="contained"
            color="primary"
          >
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
