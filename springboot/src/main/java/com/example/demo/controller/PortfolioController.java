package com.example.demo.controller;

import com.example.demo.model.Portfolio;
import com.example.demo.model.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.PortfolioUpdateRequest;
import com.example.demo.service.PortfolioService;
import com.example.demo.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    private final PortfolioService portfolioService;
    private final AuthService authService;
    private final PasswordEncoder encoder;

    @Autowired
    public PortfolioController(PortfolioService portfolioService, AuthService authService, PasswordEncoder encoder) {
        this.portfolioService = portfolioService;
        this.authService = authService;
        this.encoder = encoder;
    }

    @PostMapping("/findbyreportid")
    public Portfolio findByReportId(@RequestBody LoginRequest request) {
        User user = authService.findByUserId(request.getUserId());
        if (encoder.matches(request.getPassword(), user.getPassword())) {
            return portfolioService.findByReportId(user.getReportId());
        } else {
            return null;
        }
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
