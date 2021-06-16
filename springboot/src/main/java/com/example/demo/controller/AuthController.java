package com.example.demo.controller;

import java.util.List;

import com.example.demo.jwt.JwtUtils;
import com.example.demo.model.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.payload.response.JwtResponse;
import com.example.demo.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthService authService, PasswordEncoder encoder, JwtUtils jwtUtils,
            AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
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

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserId(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, user.getUserId(), user.getPassword()));
    }
}
