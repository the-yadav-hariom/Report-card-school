package com.school.reportcard.controller;

import com.school.reportcard.model.AdminUser;
import com.school.reportcard.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<AdminUser> adminOpt = adminUserRepository.findByEmail(email);
        
        // Demo fallback or matched password
        Map<String, Object> response = new HashMap<>();
        response.put("token", "jwt-token-admin-" + System.currentTimeMillis());

        Map<String, String> userMap = new HashMap<>();
        userMap.put("name", adminOpt.map(AdminUser::getName).orElse("Dr. Rajan Kumar"));
        userMap.put("email", email);
        userMap.put("schoolName", adminOpt.map(AdminUser::getSchoolName).orElse("MAHAVIRI SHISHU VIDYA MANDIR"));
        userMap.put("role", "ADMIN");

        response.put("user", userMap);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AdminUser signUpRequest) {
        if (adminUserRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        AdminUser user = adminUserRepository.save(signUpRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("token", "jwt-token-registered-" + System.currentTimeMillis());
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}
