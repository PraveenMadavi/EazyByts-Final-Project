package com.eazybyts.news.aggregator.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtils {
//    @Value("${cookie.security}")
//    private static boolean cookieSecurity;

    public static void addHttpOnlyCookie(HttpServletResponse response,
                                         String name,
                                         String value,
                                         int maxAge,
                                         String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);  // For dev:false and prod:true
        cookie.setPath(path);
        cookie.setMaxAge(maxAge);
//        cookie.setAttribute("SameSite", "Strict");  // Prevent CSRF

        response.addCookie(cookie);
    }
}