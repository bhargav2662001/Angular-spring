package com.empower.ecom.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.empower.ecom.model.login;
import com.empower.ecom.service.angularservice;



@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class logincontroller {

    @Autowired
    private angularservice cs;

    @GetMapping
    public List<login> getAllLogins() {
        return cs.readAll();
    }

    @GetMapping("/{id}")
    public login getLoginById(@PathVariable Integer id) {
        return cs.readById(id);
    }

    @PostMapping
    public ResponseEntity<?> addLogin(@RequestBody login login) {
        // Check if the email already exists
        if (cs.emailExists(login.getemail())) {
            // Return a response indicating the email is already in use
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        // Create the new login with encrypted password
        login newLogin = cs.create(login);
        return ResponseEntity.ok(newLogin);
    }

    @PostMapping("/validateLogin")
    public ResponseEntity<Map<String, Object>> validateLogin(@RequestBody login loginRequest) {
        String email = loginRequest.getemail();
        String password = loginRequest.getpassword();

        boolean isValid = cs.checkLogin(email, password);

        // Prepare the response body as a Map
        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", isValid);

        if (isValid) {
            response.put("message", "Login successful");
            // Return the response with HTTP 200 OK status
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid email or password");
            // Return the response with HTTP 401 Unauthorized status
            return ResponseEntity.status(401).body(response);
        }
    }

    @PutMapping("/{id}")
    public login updateLogin(@PathVariable Integer id, @RequestBody login login) {
        login.setId(id); // Ensure the ID from the path variable is set in the login object
        return cs.update(login);
    }

//    @PutMapping("/email/{email}")
//    public login updateLoginByEmail(@PathVariable String email, @RequestBody login login) {
//        login.setemail(email);
//            return cs.updateByEmail(login);
//        } 
    
    @PutMapping("/email")
    public ResponseEntity<login> updateLoginByEmail(
            @RequestParam String email,
            @RequestBody Map<String, String> updates) {
        String password = updates.get("password");
        login updatedLogin = cs.updateByEmail(email, password);
        if (updatedLogin != null) {
            return ResponseEntity.ok(updatedLogin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/logins/{id}")
    public ResponseEntity<String> deleteLogin(@PathVariable Integer id) {
        cs.deleteById(id);
        return ResponseEntity.ok("Login with ID " + id + " deleted successfully");
    }
}
