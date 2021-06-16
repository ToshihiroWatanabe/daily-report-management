package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.payload.request.SyncRequest;
import com.example.demo.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private PasswordEncoder encoder;

    @PostMapping("/sync")
    public String sync(@RequestBody SyncRequest syncRequest) {
        System.out.println(
                "sync: " + syncRequest.getUserId() + ", " + syncRequest.getPassword() + ", " + syncRequest.getReport());
        User user = authService.findByUserId(syncRequest.getUserId());
        if (encoder.matches(syncRequest.getPassword(), user.getPassword())) {
            System.out.println("パスワードが一致しました");
            return "sync";
        } else {
            System.out.println("パスワードが一致していません");
            return "notMatch";
        }
    }
}
