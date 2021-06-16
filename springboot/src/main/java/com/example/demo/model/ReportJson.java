package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportJson {
    private String date;
    private String report_items;
    private String content;
    private int updatedAt;
}
