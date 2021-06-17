package com.example.demo.mapper;

import com.example.demo.model.Setting;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SettingMapper {
    public Setting findByUserId(String userId);

    public boolean create(Setting setting);

    public boolean update(Setting setting);
}
