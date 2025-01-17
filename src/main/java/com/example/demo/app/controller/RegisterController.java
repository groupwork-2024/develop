package com.example.demo.app.controller;

import com.example.demo.app.dto.DtoCloset;
import com.example.demo.app.dto.DtoDresser;
import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.model.*;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.S3StorageService;
import com.example.demo.damain.service.StorageService;
import com.example.demo.damain.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("register/{userId}")
public class RegisterController {
    @Autowired
    UserService userService;

    @Autowired
    StorageService storageService;

    @Autowired
    ClothesService clothesService;

    @Autowired
    S3StorageService s3StorageService;

    @RequestMapping(method = RequestMethod.GET)
    public String sectionMenu(@PathVariable Long userId,
                              Model model) {
        return "For-backend-verification/choice_register";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/clothes")
    public String getUserClothes(@PathVariable Long userId,
                                 Model model) {
        model.addAttribute("userId", userId);
        List<DtoStorage> items = storageService.getUserStorage(userId);
        model.addAttribute("items", items);
        return "/For-backend-verification/add_clothes";
    }

    @RequestMapping(method = RequestMethod.POST, value="/clothes")
    public ResponseEntity<Clothes> registerClothes(
            @PathVariable Long userId,
            @RequestParam("name") String name,
            @RequestParam("brandName") String brandName,
            @RequestParam("storageId") Long storageId,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("tags") String tagsJson
    ) throws IOException {
        // デバッグログを追加
        System.out.println("User ID: " + userId);
        System.out.println("Name: " + name);
        System.out.println("Brand Name: " + brandName);
        System.out.println("Storage ID: " + storageId);
        System.out.println("Description: " + description);
        System.out.println("Tags JSON: " + tagsJson);
        if (image != null) {
            System.out.println("Image: " + image.getOriginalFilename());
        } else {
            System.out.println("Image: null");
        }

        // 例外をキャッチして詳細をログに記録
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Tag> tags = objectMapper.readValue(tagsJson, new TypeReference<List<Tag>>() {});
            Clothes registeredClothes = clothesService.registerClothes(userId, name, brandName, storageId, description, image, tags);
            return ResponseEntity.ok(registeredClothes);
        } catch (Exception e) {
            e.printStackTrace(); // 詳細な例外情報をログに出力
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/storages")
    public String choiceStorage(@PathVariable Long userId,
                                Model model) {
        return "For-backend-verification/choice_storage";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/storages/dresser")
    public String addDresser(@PathVariable Long userId,
                             Model model) {
        return "For-backend-verification/add_dresser";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/storages/dresser")
    public ResponseEntity<Void> addDresser(@PathVariable Long userId,
                                           @RequestParam("name") String name,
                                           @RequestParam("drawer-count") int drawerCount,
                                           @RequestParam("image") MultipartFile file,
                                           Model model) {
        try {
            // Service層でビジネスロジックを処理
            storageService.addDresser(userId, name, drawerCount, file);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/storages/closet")
    public String addCloset(@PathVariable Long userId,
                            Model model) {
        return "For-backend-verification/add_closet";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/storages/closet")
    public ResponseEntity<Void> addCloset(
            @PathVariable Long userId,
            @RequestParam("name") String name,
            @RequestParam("memo") String memo,
            @RequestParam("image") MultipartFile file) {
        try {
            // Service層でビジネスロジックを処理
            storageService.addCloset(userId, name, memo, file);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/storages/bags")
    public String addStorageBags(@PathVariable Long userId,
                                 Model model) {
        return "For-backend-verification/add_storage_bag";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/storages/bags")
    public ResponseEntity<Void> addBags(@PathVariable Long userId,
                                        @RequestParam ("name") String name,
                                        @RequestParam("memo") String memo,
                                        @RequestParam("image") MultipartFile file,
                                        Model model) {
        try {
            // Service層でビジネスロジックを処理
            storageService.addBags(userId, name, memo, file);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
