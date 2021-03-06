package com.example.demo.controller;

import com.example.demo.model.Report;
import com.example.demo.model.User;
import com.example.demo.payload.request.ReportUpdateRequest;
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

    @GetMapping("/findbyreportid/{reportId}")
    public Report findByReportId(@PathVariable String reportId) {
        System.out.println("findByReportId: " + reportId);
        return reportService.findByReportId(reportId);
    }

    @PostMapping("/update")
    public String update(@RequestBody ReportUpdateRequest updateRequest) {
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
}
