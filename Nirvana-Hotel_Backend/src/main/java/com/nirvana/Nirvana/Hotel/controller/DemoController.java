package com.nirvana.Nirvana.Hotel.controller;

import com.nirvana.Nirvana.Hotel.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image") // Base URL for this controller
public class DemoController {

    @Autowired
    private CloudinaryService cloudinaryService;

    // Constructor injection
    public DemoController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String url = cloudinaryService.upload(file);
            return new ResponseEntity<>(url, HttpStatus.OK);// Return the URL in the response
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Image Upload Error: " + e.getMessage()); // Handle errors
        }
    }
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Welcome"); // Correct way to set response body
    }
}
