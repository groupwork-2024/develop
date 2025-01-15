package com.example.demo.app.from;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class ClothesForm {
    private String name;
    private String brandName;
    private Long storageId;
    private String description;
    private MultipartFile image;
    private String tags;
}
