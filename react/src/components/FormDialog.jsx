import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FormControl, IconButton, Popper } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
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

const filterOptions = createFilterOptions({
  matchFrom: "start",
});

/**
 * 日報データを入力するダイアログのコンポーネントです。
 * @param {*} props
 */
export default function FormDialog(props) {
  const classes = useStyles();

  const [report, setReport] = useState(props.defaultReport);

  useEffect(() => {
    if (props.open) {
      setReport(props.defaultReport);
    }
  }, [props.open]);

  /**
   * キャンセルボタンが押されたときの処理です。
   */
  const onCancelButtonClick = () => {
    props.setOpen(false);
    setReport((report) => {
      return {
        date: "",
        content: "",
        report_items: [
          {
            category: "",
            content: "",
            hour: 1,
            minute: 0,
          },
        ],
        updatedAt: 0,
      };
    });
  };

  /**
   * 作成ボタンが押されたときの処理です。
   */
  const onCreateButtonClick = () => {
    if (validate()) {
      props.setOpen(false);
      let input = {
        date: format(props.selectedDate, "yyyy-MM-dd"),
        content: report.content,
        report_items: report.report_items,
        updatedAt: Date.now(),
      };
      setReport((report) => {
        return {
          date: "",
          content: "",
          report_items: [
            {
              category: "",
              content: "",
              hour: 1,
              minute: 0,
            },
          ],
          updatedAt: 0,
        };
      });
      props.onCreate(input);
    }
  };

  /**
   * 入力されたデータを検証します。
   */
  const validate = () => {
    for (let i = 0; i < report.report_items.length; i++) {
      let category = report.report_items[i].category.trim();
      if (category.length > 45) {
        console.error("カテゴリーは45文字以内で入力してください");
      } else if (category.length === 0) {
        console.error("カテゴリーを入力してください");
      }
    }
    return true;
  };

  /**
   * 追加ボタンがクリックされたときの処理です。
   */
  const onAddButtonClick = () => {
    setReport((report) => {
      report.report_items.push({
        ...{
          category: "",
          content: "",
          hour: 1,
          minute: 0,
        },
      });
      return { ...report };
    });
  };

  /**
   * 削除ボタンがクリックされたときの処理です。
   * @param {*} index
   */
  const onDeleteButtonClick = (index) => {
    setReport((report) => {
      let newReportItems = report.report_items.filter((e, i) => {
        return i !== index;
      });
      return { ...report, report_items: newReportItems };
    });
  };

  /**
   * カテゴリーに変化があったときの処理です。
   * @param {*} index
   * @param {*} target
   */
  const onCategoryChange = (index, target) => {
    setReport((report) => {
      report.report_items[index].category = target.value;
      return {
        date: report.date,
        content: report.content,
        report_items: report.report_items,
        updatedAt: report.updatedAt,
      };
    });
  };

  /**
   * 内容に変化があったときの処理です。
   * @param {*} index
   * @param {*} target
   */
  const onItemContentChange = (index, target) => {
    setReport((report) => {
      report.report_items[index].content = target.value;
      return {
        date: report.date,
        content: report.content,
        report_items: report.report_items,
        updatedAt: report.updatedAt,
      };
    });
  };

  /**
   * 時間に変化があったときの処理です。
   * @param {*} index
   * @param {*} value
   */
  const onHourChange = (index, value) => {
    setReport((report) => {
      report.report_items[index].hour = value;
      return {
        date: report.date,
        content: report.content,
        report_items: report.report_items,
        updatedAt: report.updatedAt,
      };
    });
  };

  const onHourTextChange = (index, target) => {
    if (target.value.match(/.*\d.*/)) {
      setReport((report) => {
        report.report_items[index].hour =
          parseInt(target.value) > 24 ? 24 : parseInt(target.value);
        return {
          date: report.date,
          content: report.content,
          report_items: report.report_items,
          updatedAt: report.updatedAt,
        };
      });
    } else {
      setReport((report) => {
        report.report_items[index].hour = 0;
        return {
          date: report.date,
          content: report.content,
          report_items: report.report_items,
          updatedAt: report.updatedAt,
        };
      });
    }
  };

  /**
   * 分に変化があったときの処理です。
   * @param {*} index
   * @param {*} value
   */
  const onMinuteChange = (index, value) => {
    setReport((report) => {
      report.report_items[index].minute = value;
      return {
        date: report.date,
        content: report.content,
        report_items: report.report_items,
        updatedAt: report.updatedAt,
      };
    });
  };

  const onMinuteTextChange = (index, target) => {
    if (target.value.match(/.*\d.*/)) {
      setReport((report) => {
        report.report_items[index].minute =
          parseInt(target.value) > 59 ? 59 : parseInt(target.value);
        return {
          date: report.date,
          content: report.content,
          report_items: report.report_items,
          updatedAt: report.updatedAt,
        };
      });
    } else {
      setReport((report) => {
        report.report_items[index].minute = 0;
        return {
          date: report.date,
          content: report.content,
          report_items: report.report_items,
          updatedAt: report.updatedAt,
        };
      });
    }
  };

  /**
   * 感想に変化があったときの処理です。
   * @param {*} event
   */
  const onContentChange = (event) => {
    setReport((report) => {
      return { ...report, content: event.target.value };
    });
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
        <DialogTitle id="form-dialog-title">
          {report.updatedAt === 0 ? "日報作成" : "日報編集"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.selectedDate.toLocaleDateString()}
          </DialogContentText>
          {report.report_items.map((value, index) => {
            return (
              <div key={index} className={classes.dFlex}>
                <TextField
                  autoFocus
                  label="カテゴリ"
                  variant="outlined"
                  margin="dense"
                  value={value.category}
                  onChange={(e, v) => onCategoryChange(index, e.target)}
                  style={{ width: "8rem", marginRight: "4px" }}
                  inputProps={{ maxLength: 45 }}
                />
                <TextField
                  label="内容"
                  variant="outlined"
                  margin="dense"
                  value={value.content}
                  onChange={(e, v) => onItemContentChange(index, e.target)}
                  style={{ width: "12rem", marginRight: "4px" }}
                  inputProps={{ maxLength: 45 }}
                />
                {/* 時間 */}
                <FormControl>
                  <Autocomplete
                    freeSolo
                    disableClearable // バツマークを無効にする
                    PopperComponent={PopperMy}
                    options={hours}
                    getOptionLabel={(option) => option.label}
                    filterOptions={filterOptions}
                    value={{
                      label: value.hour.toString(),
                      value: value.hour,
                    }}
                    onChange={(e, v) => onHourChange(index, v.value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="dense"
                        onChange={(e, v) => onHourTextChange(index, e.target)}
                        style={{
                          width: "2rem",
                          marginRight: "4px",
                        }}
                        value={{
                          label: value.hour.toString(),
                          value: value.hour,
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
                    filterOptions={filterOptions}
                    value={{
                      label: report.report_items[index].minute.toString(),
                      value: report.report_items[index].minute,
                    }}
                    onChange={(e, v) => onMinuteChange(index, v.value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="dense"
                        onChange={(e, v) => onMinuteTextChange(index, e.target)}
                        style={{
                          width: "2rem",
                          marginRight: "4px",
                        }}
                        value={{
                          label: value.minute.toString(),
                          value: value.minute,
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
                    visibility: report.report_items.length > 16 ? "hidden" : "",
                  }}
                  onClick={onAddButtonClick}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton
                  style={{
                    visibility: report.report_items.length < 2 ? "hidden" : "",
                  }}
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
            onChange={onContentChange}
            inputProps={{ maxLength: 140 }}
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
            {report.updatedAt === 0 ? "作成" : "更新"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
