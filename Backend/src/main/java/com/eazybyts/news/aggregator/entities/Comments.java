package com.eazybyts.news.aggregator.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import java.util.ArrayList;
//import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private User user;

    private String comment;

//    private List<Comments> reply= new ArrayList<>(); //implement this later in free time
}
