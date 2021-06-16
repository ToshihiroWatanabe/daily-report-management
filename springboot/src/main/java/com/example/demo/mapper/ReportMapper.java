package com.example.demo.mapper;

import com.example.demo.model.Report;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReportMapper {
    public Report findByReportId(String reportId);

    public boolean create(Report report);
}
