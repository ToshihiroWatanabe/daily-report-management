import React, { useEffect, useState } from "react";
import ReportService from "../service/report.service";

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
      ポートフォリオのページです！
      <div>{JSON.stringify(reports)}</div>
    </>
  );
};

export default Portfolio;
