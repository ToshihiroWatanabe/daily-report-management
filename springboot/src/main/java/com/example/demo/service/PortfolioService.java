package com.example.demo.service;

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

    public boolean create(Portfolio portfolio) {
        return portfolioMapper.create(portfolio);
    }

    public boolean update(Portfolio portfolio) {
        return portfolioMapper.update(portfolio);
    }
}
