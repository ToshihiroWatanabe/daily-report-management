package com.example.demo.controller;

import com.example.demo.model.Portfolio;
import com.example.demo.model.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.PortfolioUpdateRequest;
import com.example.demo.service.PortfolioService;
import com.example.demo.service.ReportService;
import com.example.demo.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    private final PortfolioService portfolioService;
    private final AuthService authService;
    private final ReportService reportService;
    private final PasswordEncoder encoder;

    @Autowired
    public PortfolioController(PortfolioService portfolioService, AuthService authService, ReportService reportService,
            PasswordEncoder encoder) {
        this.portfolioService = portfolioService;
        this.authService = authService;
        this.reportService = reportService;
        this.encoder = encoder;
    }

    @GetMapping("/findbyreportid/{reportId}")
    public Portfolio findByReportId(@PathVariable String reportId) {
        return portfolioService.findByReportId(reportId);
    }

    @GetMapping("/findreportbyreportid/{reportId}")
    public Portfolio findReportByReportId(@PathVariable String reportId) {
        Portfolio portfolio = portfolioService.findByReportId(reportId);
        portfolio.setReport(reportService.findByReportId(reportId).getReport());
        return portfolio;
        // return
        // portfolioService.findByReportId(reportId).setReport(reportService.findByReportId(reportId).getReport());
    }

    @PostMapping("/update")
    public String update(@RequestBody PortfolioUpdateRequest request) {
        User user = authService.findByUserId(request.getUserId());
        if (encoder.matches(request.getPassword(), user.getPassword())) {
            Portfolio portfolio = new Portfolio();
            portfolio.setReportId(user.getReportId());
            portfolio.setUserName(request.getUserName());
            portfolio.setIntroduction(request.getIntroduction());
            portfolio.setSkillSet(request.getSkillSet());
            return String.valueOf(portfolioService.update(portfolio));
        } else {
            return "passwordDoesNotMatch";
        }
    }
}
