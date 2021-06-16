package com.example.demo.controller;

import java.io.IOException;

import com.example.demo.model.Report;
import com.example.demo.model.User;
import com.example.demo.payload.request.SyncRequest;
import com.example.demo.payload.request.UpdateRequest;
import com.example.demo.service.AuthService;
import com.example.demo.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private AuthService authService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/sync")
    public String sync(@RequestBody SyncRequest syncRequest) throws IOException {
        System.out.println("syncRequest: " + syncRequest.getUserId() + ", " + syncRequest.getPassword() + ", "
                + syncRequest.getReport());
        User user = authService.findByUserId(syncRequest.getUserId());
        if (encoder.matches(syncRequest.getPassword(), user.getPassword())) {
            System.out.println("パスワードが一致しました");
            Report findByReportIdResult = reportService.findByReportId(user.getReportId());
            if (findByReportIdResult == null) {
                // create
                Report report = new Report();
                report.setReportId(user.getReportId());
                report.setReport(syncRequest.getReport());
                reportService.create(report);
                return "created";
            } else {
                String serverReport = findByReportIdResult.getReport();
                String clientReport = syncRequest.getReport();
                return findByReportIdResult.getReport();
            }
        } else {
            System.out.println("パスワードが一致していません");
            return "passwordDoesNotMatch";
        }
    }

    @PostMapping("/update")
    public String update(@RequestBody UpdateRequest updateRequest) {
        System.out.println("updateRequest: " + updateRequest.getUserId() + ", " + updateRequest.getPassword() + ", "
                + updateRequest.getReport());
        User user = authService.findByUserId(updateRequest.getUserId());
        if (encoder.matches(updateRequest.getPassword(), user.getPassword())) {
            System.out.println("パスワードが一致しました");
            Report report = new Report();
            report.setReportId(user.getReportId());
            report.setReport(updateRequest.getReport());
            reportService.update(report);
            return "updated";
        } else {
            System.out.println("パスワードが一致していません");
            return "passwordDoesNotMatch";
        }
    }

    @GetMapping("/findbyreportid/{reportId}")
    public String findByReportId(@PathVariable String reportId) {
        System.out.println("findByReportId: " + reportId);
        Report report = reportService.findByReportId(reportId);
        return report.getReport();
    }
}
