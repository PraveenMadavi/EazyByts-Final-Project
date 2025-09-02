package com.eazybyts.news.aggregator.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commented_by")
    private User user;

    private Instant commentedAt=Instant.now();

    private String comment;

//    private List<Comments> reply= new ArrayList<>(); //implement this later in free time
}
