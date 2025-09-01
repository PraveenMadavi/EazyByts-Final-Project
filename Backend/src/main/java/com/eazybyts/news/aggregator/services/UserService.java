package com.eazybyts.news.aggregator.services;

import com.eazybyts.news.aggregator.entities.User;
import com.eazybyts.news.aggregator.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
//@RequiredArgsConstructor//........does this require
public class UserService {
    @Autowired
    private UserRepo userRepository;

    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.getReferenceById(userId);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}