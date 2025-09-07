package com.eazybyts.news.aggregator.repositories;

import com.eazybyts.news.aggregator.entities.LikedArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedArticleRepo extends JpaRepository<LikedArticle, Long> {
}
