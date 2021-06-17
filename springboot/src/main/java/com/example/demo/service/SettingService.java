package com.example.demo.service;

import com.example.demo.mapper.SettingMapper;
import com.example.demo.model.Setting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingService {
    private final SettingMapper settingMapper;

    @Autowired
    public SettingService(SettingMapper settingMapper) {
        this.settingMapper = settingMapper;
    }

    public Setting findByUserId(String userId) {
        return settingMapper.findByUserId(userId);
    }

    public boolean create(Setting setting) {
        return settingMapper.create(setting);
    }

    public boolean update(Setting setting) {
        return settingMapper.update(setting);
    }
}
