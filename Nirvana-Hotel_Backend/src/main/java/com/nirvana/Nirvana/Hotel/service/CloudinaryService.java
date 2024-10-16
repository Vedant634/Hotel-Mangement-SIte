package com.nirvana.Nirvana.Hotel.service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {


    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }
    public String upload(MultipartFile file) {
        try {
            @SuppressWarnings("unchecked")
            Map<String,Object> uploadResult =  cloudinary.uploader().upload(file.getBytes(), Map.of());
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Image Upload Error", e);
        }
    }
}
