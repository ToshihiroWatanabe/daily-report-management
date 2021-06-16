import React, { useEffect, useState } from "react";
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
      <ReportAnalytics reports={reports} />
    </>
  );
};

export default Portfolio;
