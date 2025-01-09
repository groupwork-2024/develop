package com.example.demo.app.controller;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.service.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clothes")
public class ClothesDynamicController {
    @Autowired
    private ClothesService clothesService;

    @RequestMapping(method = RequestMethod.GET, value = "{userId}")
    public List<Clothes> getClothes(@PathVariable Long userId) {
        return clothesService.getClothesSortedByCreatedAtDesc(userId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{id}")
    public ResponseEntity<Void> deleteClothes(@PathVariable Long id) {
        boolean isDeleted = clothesService.deleteClothesById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
