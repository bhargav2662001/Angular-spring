package com.empower.ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.empower.ecom.Repository.UserRepository;
import com.empower.ecom.dto.LoginRequest;
import com.empower.ecom.dto.RegisterRequest;
import com.empower.ecom.model.JwtResponse;
import com.empower.ecom.model.sample;
import com.empower.ecom.util.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public void register(RegisterRequest registerRequest) {
        sample user = new sample();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);
    }

    public JwtResponse login(LoginRequest loginRequest) {
        // Find user by username
        sample user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if passwords match
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername());

            // Return token only
            return new JwtResponse(token);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public String validateTokenAndGetMessage(String token) {
        // Validate token
        String username = jwtUtil.extractUsername(token);
        if (username != null && jwtUtil.validateToken(token, username)) {
            return "Login successful";
        } else {
            throw new RuntimeException("Failed to authorize token");
        }
    }
}
