package com.example.demo.controller;

import java.util.List;

import com.example.demo.model.User;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.service.AuthService;

import org.apache.logging.log4j.message.Message;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final PasswordEncoder encoder;

    public AuthController(AuthService authService, PasswordEncoder encoder) {
        this.authService = authService;
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
        user.setPassword(signupRequest.getPassword());
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        user.setReportId(encoder.encode(signupRequest.getUserId()).replaceAll("[-_@+*;:#$%&/.]",
                String.valueOf(chars.charAt((int) (chars.length() * Math.random())))));
        System.out.println(signupRequest.getUserId() + ", " + signupRequest.getPassword() + " " + user.getReportId());
        return String.valueOf(authService.create(user));
    }
}
