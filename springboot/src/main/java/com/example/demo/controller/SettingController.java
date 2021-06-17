package com.example.demo.controller;

import com.example.demo.model.Setting;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SettingUpdateRequest;
import com.example.demo.service.SettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/setting")
public class SettingController {
    private final SettingService settingService;

    @Autowired
    public SettingController(SettingService settingService) {
        this.settingService = settingService;
    }

    @PostMapping("/findbyuserid")
    public Setting findByUserId(@RequestBody LoginRequest loginRequest) {

    }

    @PostMapping("/update")
    public boolean update(@RequestBody SettingUpdateRequest request) {

    }
}
