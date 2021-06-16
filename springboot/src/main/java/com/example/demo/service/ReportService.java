package com.example.demo.service;

import com.example.demo.mapper.ReportMapper;
import com.example.demo.model.Report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportMapper reportMapper;

    public Report findByReportId(String reportId) {
        return reportMapper.findByReportId(reportId);
    }

    public boolean create(Report report) {
        return reportMapper.create(report);
    }

    public boolean update(Report report) {
        return reportMapper.update(report);
    }
}
