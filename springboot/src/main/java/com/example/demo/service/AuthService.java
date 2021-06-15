package com.example.demo.service;

import java.util.List;

import com.example.demo.mapper.AuthMapper;
import com.example.demo.model.User;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthMapper authMapper;

    public AuthService(AuthMapper authMapper) {
        this.authMapper = authMapper;
    }

    public List<User> findAll() {
        return authMapper.findAll();
    }

    public boolean create(User user) {
        return authMapper.create(user);
    }
}
