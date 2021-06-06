import React, { useState } from "react";
import ReportDatePicker from "./components/ReportDatePicker";
import CustomDatePicker from "./components/CustomDatePicker";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormDialog from "./components/FormDialog";

const useStyles = makeStyles((theme) => ({
  main: { [theme.breakpoints.up("sm")]: { display: "flex" } },
  leftColumn: {
    [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) },
  },
  rightColumn: { [theme.breakpoints.up("sm")]: { margin: theme.spacing(1) } },
  createReportButton: { margin: theme.spacing(1) },
}));

function App() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <h1>日報管理</h1>
      <main className={classes.main}>
        <div className={classes.leftColumn}>
          <ReportDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          {/* <CustomDatePicker /> */}
        </div>
        <div className={classes.rightColumn}>
          <Typography variant="h5">
            {format(selectedDate, "yyyy/MM/dd")}の日報
          </Typography>
          <Typography>日報はありません</Typography>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.createReportButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={(event) => setOpen(true)}
          >
            日報作成
          </Button>
          <FormDialog open={open} setOpen={setOpen} />
        </div>
      </main>
    </>
  );
}

export default App;
