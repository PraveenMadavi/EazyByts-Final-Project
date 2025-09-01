package com.eazybyts.news.aggregator.controllers;

import com.eazybyts.news.aggregator.dtos.ApiResponse;
import com.eazybyts.news.aggregator.dtos.Article;
import com.eazybyts.news.aggregator.dtos.ReqData;
import com.eazybyts.news.aggregator.services.NewsApiService;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsQueryController {

    @Autowired
    private NewsApiService newsApiService;

    @PostMapping("/get-news")
    public List<Article> getNews (@RequestBody ReqData reqData){
        System.out.println(reqData);
        ApiResponse apiResponse = newsApiService.getNews(reqData);
//        System.out.println(apiResponse.getArticles());

        return apiResponse.getArticles();
    }

}
