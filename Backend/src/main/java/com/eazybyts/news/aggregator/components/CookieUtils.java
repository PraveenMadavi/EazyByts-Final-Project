package com.eazybyts.news.aggregator.components;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtils {

    public static void addHttpOnlyCookie(HttpServletResponse response,
                                         String name,
                                         String value,
                                         int maxAge,
                                         String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);  // For dev:false and prod:true
        cookie.setPath(path);
        cookie.setMaxAge(maxAge);
        cookie.setAttribute("SameSite", "none");  // Prevent CSRF

        response.addCookie(cookie);

    }
}