package com.example.demo.controller;

import com.example.demo.model.Setting;
import com.example.demo.model.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SettingUpdateRequest;
import com.example.demo.service.AuthService;
import com.example.demo.service.SettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/setting")
public class SettingController {
    private final SettingService settingService;
    private final AuthService authService;
    private final PasswordEncoder encoder;

    @Autowired
    public SettingController(SettingService settingService, AuthService authService) {
        this.settingService = settingService;
        this.authService = authService;
    }

    @PostMapping("/findbyuserid")
    public Setting findByUserId(@RequestBody LoginRequest request) {
        User user = authService.findByUserId(request.getUserId());
        if (encoder.matches(request.getPassword(), user.getPassword())) {
            return settingService.findByUserId(request.getUserId());
        } else {
            return null;
        }
    }

    @PostMapping("/update")
    public boolean update(@RequestBody SettingUpdateRequest request) {

    }
}
