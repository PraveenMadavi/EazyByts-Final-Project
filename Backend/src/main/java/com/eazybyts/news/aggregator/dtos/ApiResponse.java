package com.eazybyts.news.aggregator.dtos;


import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApiResponse {
    private String status;
    private int totalResults;
    private List<Article> articles;

}

