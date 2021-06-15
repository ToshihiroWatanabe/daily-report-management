package com.example.demo.controller;

import com.example.demo.payload.request.SignupRequest;

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
    @PostMapping("/signup")
    public String registerUser(@Validated @RequestBody SignupRequest signupRequest) {
        System.out.println(signupRequest.getUserId() + ", " + signupRequest.getPassword());
        return signupRequest.getUserId() + ", " + signupRequest.getPassword();
    }
}
