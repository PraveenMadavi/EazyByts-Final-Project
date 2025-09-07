package com.eazybyts.news.aggregator.configurations;

import com.eazybyts.news.aggregator.jwt.JwtAuthenticationEntryPoint;
import com.eazybyts.news.aggregator.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class JwtSecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)// Disable CSRF for stateless JWT-based authentication
                .cors(cors->{}) //enabling cors ---> for corsConfig
                .authorizeHttpRequests(auth -> auth
                        // authenticate endpoints of applications
//                        .requestMatchers("/api/news/**").permitAll() // authenticate this later.....
                        .requestMatchers("/api/user/**").permitAll() // Public endpoint
                        // WebSocket endpoints - permit all for handshake
                        .requestMatchers("/ws/**", "/app/**", "/topic/**", "/queue/**", "/user/**").permitAll()
//                        .requestMatchers("/api/news/**").hasRole("USER") // authenticate this later.....
                        .requestMatchers("/api/news/**","/api/react/**").authenticated() // authenticate this later.....
                        .requestMatchers("/main/**").authenticated()   // Secure endpoint
                        .anyRequest().authenticated()               // All other endpoints require authentication
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint)) // Handle unauthorized requests
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before username-password authentication

        return http.build();
    }


    //DaoAuthenticationProvider

}//endregion
