package com.example.demo.app.controller;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("section/{userId}")
public class ClothesController {
    @Autowired
    ClothesService clothesService;

    @Autowired
    StorageService storageService;

    @RequestMapping(method = RequestMethod.GET)
    public String sectionMenu(@PathVariable Long userId,
                              Model model) {
        return "For-backend-verification/list_select";
    }

    @RequestMapping(method = RequestMethod.GET, value="/clothes")
    public String getUserClothes(@PathVariable Long userId,
                                 @RequestParam(value = "order", defaultValue = "desc") String order,
                                 Model model) {
        List<Clothes> clothesList;
        if ("asc".equals(order)) {
            clothesList = clothesService.getClothesSortedByCreateAtAsc(userId);
        }
        else {
            clothesList = clothesService.getClothesSortedByCreatedAtDesc(userId);
        }
        model.addAttribute("clothesList", clothesList);
        model.addAttribute("order", order);
        System.out.println("Storages returned: " + clothesList);
        return "For-backend-verification/clothes_list";
    }

    @RequestMapping(method = RequestMethod.GET, value="/storages")
    public String getUserStorage(@PathVariable Long userId,
                                 @RequestParam(required = false, defaultValue = "DRESSER") StorageType storageType,
                                 Model model) {
        List<Storage> storagesByType = storageService.getStoragesByUserAndType(storageType, userId);
        model.addAttribute("storages", storagesByType);
        model.addAttribute("userId", userId);
        return "For-backend-verification/storage_list";
    }

}
