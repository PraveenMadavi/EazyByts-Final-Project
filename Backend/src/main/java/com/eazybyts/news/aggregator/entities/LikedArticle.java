package com.eazybyts.news.aggregator.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LikedArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String  title;

    private String url;

    private String urlToImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "liked_by")
    private User user;

    private Instant likedAt=Instant.now();



}
