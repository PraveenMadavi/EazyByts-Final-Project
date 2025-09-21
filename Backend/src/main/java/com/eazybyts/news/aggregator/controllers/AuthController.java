package com.eazybyts.news.aggregator.controllers;

import com.eazybyts.news.aggregator.components.CookieUtils;
import com.eazybyts.news.aggregator.entities.User;
import com.eazybyts.news.aggregator.jwt.JwtHelper;
import com.eazybyts.news.aggregator.repositories.UserRepo;
import com.eazybyts.news.aggregator.userdetails.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            if (userDTO.getEmail() == null || userDTO.getPassword() == null) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Email and password must not be empty"));
            }

            if (userRepo.findByEmail(userDTO.getEmail()).isPresent()) {
                log.warn("User registration failed: {} is already registered", userDTO.getEmail());
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(ApiResponse.error("User already exists with this email"));
            }

            User user = new User();
            user.setEmail(userDTO.getEmail());
            user.setUsername(userDTO.getUsername());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setRole("USER");
            userRepo.save(user);

            log.info("User registered successfully: {}", user.getEmail());
            return ResponseEntity.ok(ApiResponse.success("User registered successfully"));

        } catch (Exception e) {
            log.error("Error during user registration: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(ApiResponse.error("Registration failed"));
        }
    }

    /**
     * Authenticate user and return JWT token in HttpOnly cookie
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO, HttpServletResponse response) {
        try {
            if (userLoginDTO.getEmail() == null || userLoginDTO.getPassword() == null) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Email and password must not be empty"));
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userLoginDTO.getEmail(),
                            userLoginDTO.getPassword()
                    )
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String jwtToken = jwtHelper.generateToken(userDetails);
            System.out.println("JWTToken : "+ jwtToken);

            CookieUtils.addHttpOnlyCookie(
                    response,
                    "jwtToken",
                    jwtToken,
                    2 * 60 * 60, // 2 Hours in seconds
                    "/"
            );

            User user = userRepo.findByEmail(userLoginDTO.getEmail()).orElseThrow();
            UserInfo userInfo = new UserInfo();
            userInfo.setEmail(user.getEmail());
            userInfo.setUsername(user.getUsername());

            log.info("User logged in successfully: {}", userLoginDTO.getEmail());
            return ResponseEntity.ok(userInfo);

        } catch (AuthenticationException e) {
            log.warn("Invalid login attempt for {}", userLoginDTO.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid email or password"));
        } catch (Exception e) {
            log.error("Error during login: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(ApiResponse.error("Login failed"));
        }
    }

    /**
     * Logout user by clearing JWT cookie
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        try {
            // Overwrite the cookie with an empty value and set maxAge = 0
            CookieUtils.addHttpOnlyCookie(
                    response,
                    "jwtToken",
                    "",
                    0, // expire immediately
                    "/"
            );

            log.info("User logged out successfully");
            return ResponseEntity.ok(ApiResponse.success("Logout successful"));

        } catch (Exception e) {
            log.error("Error during logout: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(ApiResponse.error("Logout failed"));
        }
    }


    // --- DTOs ---
    @Data
    public static class UserDTO {
        private String username;
        private String email;
        private String password;
    }

    @Data
    public static class UserInfo {
        private String username;
        private String email;
    }

    @Data
    public static class UserLoginDTO {
        private String email;
        private String password;
    }

    // --- Standard API Response Wrapper ---
    @Data
    public static class ApiResponse {
        private boolean success;
        private String message;

        public static ApiResponse success(String message) {
            ApiResponse res = new ApiResponse();
            res.setSuccess(true);
            res.setMessage(message);
            return res;
        }

        public static ApiResponse error(String message) {
            ApiResponse res = new ApiResponse();
            res.setSuccess(false);
            res.setMessage(message);
            return res;
        }
    }
}
