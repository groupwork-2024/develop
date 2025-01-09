package com.example.demo.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StorageResponse {
    private String name;
    private String imageUrl;
}
