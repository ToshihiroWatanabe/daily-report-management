package com.example.demo.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String userId;
    private String password;

    public JwtResponse(String accessToken, String userId, String password) {
        this.token = accessToken;
        this.userId = userId;
        this.password = password;
    }
}
