package com.empower.ecom.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empower.ecom.model.login;
import com.empower.ecom.service.angularservice;


@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*") 
public class logincontroller {
	  public logincontroller(angularservice cs) {
	        this.cs = cs;
	    }
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
//	@PostMapping
//	public login addLogin(@RequestBody login login) {
//        return cs.create(login);
//    }
	@PostMapping
    public ResponseEntity<?> addLogin(@RequestBody login login) {
        // Check if the email already exists
        if (cs.emailExists(login.getemail())) {
            // Return a response indicating the email is already in use
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        // Create the new login if email doesn't exist
        login newLogin = cs.create(login);
        return ResponseEntity.ok(newLogin);
    }
//	@PostMapping("/validateLogin")
//    public String validateLogin(@RequestBody login loginRequest) {
//        String email = loginRequest.getemail();
//        String password = loginRequest.getpassword();
//
//        boolean isValid = cs.checkLogin(email, password);
//
//        if (isValid) {
//            return "Login successful";
//        } else {
//            return "Invalid email or password";
//        }
//    }
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
	@DeleteMapping("/logins/{id}")
    public ResponseEntity<String> deleteLogin(@PathVariable Integer id) {
        cs.deleteById(id);
        return ResponseEntity.ok("Login with ID " + id + " deleted successfully");
    }
}
