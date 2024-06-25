package com.empower.ecom.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import com.empower.ecom.model.upload;
import com.empower.ecom.service.uploadservice;

@RestController
@RequestMapping("/upload")
public class uploadcontroller {

	@Autowired
	private uploadservice us;
	
	@PostMapping("/upload")
    public ResponseEntity<upload> uploadFile(@RequestBody upload fileUploadDTO) {
        try {
            // Call the service to store the file
            upload savedFile = us.storeFile(fileUploadDTO);
            return new ResponseEntity<>(savedFile, HttpStatus.OK);
        } catch (IOException e) {
            // Log and return error response
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // Handle other exceptions (e.g., validation issues)
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/files")
    public ResponseEntity<List<upload>> getAllUploadedFiles() {
        try {
            List<upload> files = us.getAllUploadedFiles(); // Implement this method in your service
            return new ResponseEntity<>(files, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/files/{id}")
    public ResponseEntity<upload> getUploadedFileById(@PathVariable("id") Integer id) {
        try {
        	upload file = us.getUploadedFileById(id);
            if (file != null) {
                return new ResponseEntity<>(file, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @PutMapping("/files/{id}")
    public ResponseEntity<upload> updateUploadedFile(@PathVariable("id") Integer id, @RequestBody upload updatedFileDetails) {
        try {
            upload updatedFile = us.updateFile(id, updatedFileDetails);
            if (updatedFile != null) {
                return new ResponseEntity<>(updatedFile, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
