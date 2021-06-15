package com.example.demo.mapper;

import java.util.List;

import com.example.demo.model.User;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthMapper {

    public List<User> findAll();

    public boolean create(User user);
}
