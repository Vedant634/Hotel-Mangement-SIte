package com.nirvana.Nirvana.Hotel.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = ObjectUtils.asMap(
                "cloud_name", "dv1yqet3t",
                "api_key", "372238824487286",
                "api_secret", "m55K0bogtoBLXaqu_24nI8NoYzo",
                "secure", true
        );
        return new Cloudinary(config);
    }
}
