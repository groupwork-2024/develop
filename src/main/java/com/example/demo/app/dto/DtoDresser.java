package com.example.demo.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DtoDresser {
    private String name;
    private Integer drawerCount;
    private byte[] imageData;
}
