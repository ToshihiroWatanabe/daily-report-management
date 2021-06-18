import { Button, Card, Chip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortfolioService from "../service/portfolio.service";
import ReportAnalytics from "./ReportAnalytics";

const Portfolio = () => {
  const [reports, setReports] = useState([]);
  const [userName, setUserName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [skillSet, setSkillSet] = useState([]);
  const reportId = document.location.href.split("/").slice(-1)[0];

  const [message, setMessage] = useState("読込中...");

  useEffect(() => {
    PortfolioService.findReportByReportId(reportId)
      .then((response) => {
        if (response.data.report.length > 0) {
          console.log(response.data);
          setReports(JSON.parse(response.data.report));
          setUserName(response.data.userName);
          setIntroduction(response.data.introduction);
          setSkillSet(
            JSON.parse(
              response.data.skillSet === null ? [] : response.data.skillSet
            )
          );
        }
      })
      .catch((e) => {
        setMessage("エラーが発生しました。");
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
      {reports.length > 0 && (
        <>
          <Card
            style={{
              width: "95%",
              padding: "1rem",
              marginLeft: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h5">{userName}</Typography>
            <Typography>{introduction}</Typography>
            <Typography variant="h6" style={{ marginTop: "1rem" }}>
              {skillSet.length > 0 && "スキルセット"}
            </Typography>
            {skillSet.map((e) => {
              return (
                <>
                  <Chip label={e} style={{ margin: "0.1rem" }} />
                </>
              );
            })}
          </Card>
          <ReportAnalytics reports={reports} />
        </>
      )}
      {reports.length === 0 && (
        <>
          <div>{message}</div>
        </>
      )}
    </>
  );
};

export default Portfolio;
