package com.eazybyts.news.aggregator.controllers;

import com.eazybyts.news.aggregator.entities.Comments;
import com.eazybyts.news.aggregator.entities.LikedArticle;
import com.eazybyts.news.aggregator.entities.User;
import com.eazybyts.news.aggregator.repositories.UserRepo;
import com.eazybyts.news.aggregator.userdetails.CustomUserDetails;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/react")
public class UserReactionController {

    private final UserRepo userRepo;

    public UserReactionController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/like")
    public ResponseEntity<?> like(@RequestBody LikeDTO likeDTO, Authentication authentication, @AuthenticationPrincipal CustomUserDetails customUserDetails) {

//        Long userId = (Long) session.getAttribute("userId");
        Long userId = customUserDetails.getUserId();

        if (userId == null) {
            log.warn("No user found in session while liking article.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in.");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        log.info("User fetched for like: {}", user.getUsername());

        LikedArticle likedArticle = new LikedArticle();
        likedArticle.setUrl(likeDTO.getUrl());
        likedArticle.setTitle(likeDTO.getTitle());
        likedArticle.setUrlToImage(likeDTO.getUrlToImage());
        likedArticle.setUser(user);

        user.getLikes().add(likedArticle);
        userRepo.save(user);

        log.info("Article liked by user: {}", user.getUsername());
        return ResponseEntity.ok("Article liked successfully.");
    }

    @PostMapping("/comment")
    public ResponseEntity<?> comment(@RequestBody CommentDTO commentDTO, HttpSession session,@AuthenticationPrincipal CustomUserDetails customUserDetails) {
//        Long userId = (Long) session.getAttribute("userId");
        Long userId = customUserDetails.getUserId();
        if (userId == null) {
            log.warn("No user found in session while commenting.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in.");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        log.info("User fetched for comment: {}", user.getUsername());

        Comments comment = new Comments();
        comment.setComment(commentDTO.getComment());
        comment.setUser(user);

        user.getComments().add(comment);
        userRepo.save(user);

        log.info("Comment added by user: {}", user.getUsername());
        return ResponseEntity.ok("Comment added successfully.");
    }


    // DTOs
    @Data
    public static class LikeDTO {
        private String title;
        private String url;
        private String urlToImage;
    }

    @Data
    public static class CommentDTO {
        private String comment;
    }
}
