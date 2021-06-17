package com.example.demo.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportUpdateRequest {
    private String userId;
    private String password;
    private String report;
}
