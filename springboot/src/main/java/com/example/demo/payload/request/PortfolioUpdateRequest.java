package com.example.demo.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PortfolioUpdateRequest {
    private String userId;
    private String password;
    private String userName;
    private String introduction;
    private String skillSet;
}
