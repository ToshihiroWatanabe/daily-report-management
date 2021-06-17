package com.example.demo.mapper;

import com.example.demo.model.Portfolio;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PortfolioMapper {

    public boolean create(Portfolio portfolio);

    public boolean update(Portfolio portfolio);
}
