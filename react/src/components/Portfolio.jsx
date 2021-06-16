import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportService from "../service/report.service";
import ReportAnalytics from "./ReportAnalytics";

const Portfolio = () => {
  const [reports, setReports] = useState([]);
  const reportId = document.location.href.split("/").slice(-1)[0];

  useEffect(() => {
    ReportService.findByReportId(reportId).then((response) => {
      console.log(response);
      if (typeof response.data === "object") {
        setReports(response.data);
      }
    });
  }, []);

  return (
    <>
      <Link
        to="/"
        id="linkToHome"
        onClick={() => {
          document.getElementById("linkToHome").click();
          setTimeout(window.location.reload(), 1);
        }}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Button>
          <Typography>日報管理アプリ</Typography>
        </Button>
      </Link>
      {reports.length > 0 && <ReportAnalytics reports={reports} />}
      {reports.length === 0 && (
        <>
          <div>読込中...</div>
        </>
      )}
    </>
  );
};

export default Portfolio;
