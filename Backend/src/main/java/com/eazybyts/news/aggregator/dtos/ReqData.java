package com.eazybyts.news.aggregator.dtos;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ReqData{
    private String q;
    private int pageSize;
    private int page;
}