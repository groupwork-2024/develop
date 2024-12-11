package com.example.demo.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DtoCloset {
    private String name;
    private Integer hangerCount;
    private byte[] imageData;
}
