package com.example.demo.controller;

import java.util.List;

import com.example.demo.model.Portfolio;
import com.example.demo.model.Report;
import com.example.demo.model.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.service.AuthService;
import com.example.demo.service.PortfolioService;
import com.example.demo.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final ReportService reportService;
    private final PortfolioService portfolioService;
    private final PasswordEncoder encoder;

    @Autowired
    public AuthController(AuthService authService, ReportService reportService, PortfolioService portfolioService,
            PasswordEncoder encoder) {
        this.authService = authService;
        this.reportService = reportService;
        this.portfolioService = portfolioService;
        this.encoder = encoder;
    }

    @PostMapping("/signup")
    public String signup(@Validated @RequestBody SignupRequest signupRequest) {
        // ユーザーIDが既に存在しているか確認する
        List<User> userList = authService.findAll();
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getUserId().equals(signupRequest.getUserId())) {
                return "already";
            }
        }
        User user = new User();
        user.setUserId(signupRequest.getUserId());
        user.setPassword(encoder.encode(signupRequest.getPassword()));
        // 日報IDの生成
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        user.setReportId(encoder.encode(signupRequest.getUserId()).replaceAll("[-_@+*;:#$%&/.]",
                String.valueOf(chars.charAt((int) (chars.length() * Math.random())))));
        System.out.println("signup: " + signupRequest.getUserId() + ", " + signupRequest.getPassword() + ", "
                + user.getReportId());
        // テーブルにレコードを挿入
        Report report = new Report();
        report.setReportId(user.getReportId());
        reportService.create(report);
        Portfolio portfolio = new Portfolio();
        portfolio.setReportId(user.getReportId());
        portfolioService.create(portfolio);

        return String.valueOf(authService.create(user)) + ": " + user.getReportId();
    }

    @PostMapping("/login")
    public String authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
        System.out.println("loginRequest: " + loginRequest.getUserId() + ", " + loginRequest.getPassword());
        User user = new User();
        user.setUserId(loginRequest.getUserId());
        user.setPassword(loginRequest.getPassword());
        List<User> userList = authService.findAll();
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getUserId().equals(loginRequest.getUserId())) {
                System.out.println("ユーザーIDが見つかりました。");
                if (encoder.matches(loginRequest.getPassword(), userList.get(i).getPassword())) {
                    System.out.println("パスワードが一致しました。");
                    return "true: " + userList.get(i).getReportId();
                }
            }
        }
        return "false";
    }
}
