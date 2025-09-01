package com.eazybyts.news.aggregator.services;


import com.eazybyts.news.aggregator.dtos.ApiResponse;
import com.eazybyts.news.aggregator.dtos.ReqData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class NewsApiService {
    @Autowired
    private RestTemplate restTemplate;

    private static final Logger log = LoggerFactory.getLogger(NewsApiService.class);

    public ApiResponse getNews(ReqData reqData){

        String url = "https://newsapi.org/v2/everything?q="+reqData.getQ()+"&pageSize="+reqData.getPageSize()+"&page="+reqData.getPage()+"&apiKey=8c6ce618f1aa42c5b3e1671984c930ca";
//        try {
//            ResponseEntity<ApiResponse> response = restTemplate.getForEntity(url, ApiResponse.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                ApiResponse apiResponse = response.getBody();
//                log.info("Successfully fetched {} articles", apiResponse.getTotalResults());
//                return apiResponse;
//            } else {
//                log.error("Failed to fetch news. Status code: {}", response.getStatusCode());
//                throw new RuntimeException("Failed to fetch news from API");
//            }
//
//        } catch (RestClientException e) {
//            log.error("Error calling NewsAPI: {}", e.getMessage());
//            throw new RuntimeException("Error connecting to NewsAPI", e);
//        }
        return restTemplate.getForObject(url, ApiResponse.class);
    }
}
