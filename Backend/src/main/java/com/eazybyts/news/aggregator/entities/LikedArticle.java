package com.eazybyts.news.aggregator.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikedArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String  title;

    private String url;

    private String urlToImage;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Comments> commentsList = new ArrayList<>();


}
