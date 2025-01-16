package com.example.demo.app.controller;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.Tag;
import com.example.demo.damain.model.User;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.StorageService;
import com.example.demo.damain.service.TagService;
import com.example.demo.damain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/my_page/{userId}")
public class myPageController {

    @Autowired
    ClothesService clothesService;

    @Autowired
    StorageService storageService;

    @Autowired
    TagService tagService;

    @Autowired
    UserService userService;

    @GetMapping("/clothes")
    public List<Clothes> getClothes(@PathVariable Long userId) {
        return clothesService.findAllClothesByUserId(userId);
    }

    @GetMapping("/closet")
    public List<Storage> getStorage(@PathVariable Long userId) {
        return storageService.findAllStorageByUserId(userId);
    }

    @GetMapping("/tags")
    public List<Tag> getTags(@PathVariable Long userId) {
        return tagService.findAllTagByUserId(userId);
    }

    @PostMapping("/icon")
    public User saveIcon(@PathVariable Long userId,
                               @RequestParam("image") MultipartFile image) throws IOException {
        return userService.saveIcon(userId, image);
    }
}
