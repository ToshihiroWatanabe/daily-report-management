package com.example.demo.service;

import javax.sound.sampled.Port;

import com.example.demo.mapper.PortfolioMapper;
import com.example.demo.model.Portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {
    private final PortfolioMapper portfolioMapper;

    @Autowired
    public PortfolioService(PortfolioMapper portfolioMapper) {
        this.portfolioMapper = portfolioMapper;
    }

    public Portfolio findByReportId(String reportId) {
        return portfolioMapper.findByReportId(reportId);
    }

    public boolean create(Portfolio portfolio) {
        return portfolioMapper.create(portfolio);
    }

    public boolean update(Portfolio portfolio) {
        return portfolioMapper.update(portfolio);
    }
}
