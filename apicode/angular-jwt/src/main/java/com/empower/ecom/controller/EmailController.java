package com.empower.ecom.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.empower.ecom.model.OtpUtil;
import com.empower.ecom.service.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;
    
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();
    

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> request) {
        String to = request.get("to");
        
        if (to == null || to.isEmpty()) {
            return ResponseEntity.badRequest().body("Email address is required");
        }
        
        String subject = "Your OTP Code";
        String otp = OtpUtil.generateOtp(); // Generate the OTP
        otpStore.put(to, otp); // Store the OTP
        
        try {
            emailService.sendEmail(to, subject, "Your OTP code is: " + otp);
            return ResponseEntity.ok("OTP sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> request) {
        String to = request.get("to");
        String otp = request.get("otp");
        String storedOtp = otpStore.get(to);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStore.remove(to); // OTP is valid, remove it from the store
            return "OTP verified successfully";
        } else {
            return "Invalid OTP";
        }
    }
}