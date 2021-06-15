package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 5, max = 32)
    private String userId;

    @NotBlank
    @Size(min = 12, max = 100)
    private String password;
}
