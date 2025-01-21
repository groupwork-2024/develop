package com.example.demo.app.controller;

import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.model.*;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.DresserService;
import com.example.demo.damain.service.StorageService;
import com.example.demo.damain.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("section/{userId}")
public class ClothesController {
    @Autowired
    ClothesService clothesService;

    @Autowired
    StorageService storageService;

    @Autowired
    TagService tagService;

    @Autowired
    DresserService dresserService;

    @RequestMapping(method = RequestMethod.GET)
    public String sectionMenu(@PathVariable Long userId,
                              Model model) {
        return "For-backend-verification/index_choice";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/clothes")
    public String getUserClothes(@PathVariable Long userId,
                                 @RequestParam(value = "order", defaultValue = "desc") String order,
                                 Model model) {
        List<Clothes> clothesList;

        if ("asc".equals(order)) {
            clothesList = clothesService.getClothesSortedByCreateAtAsc(userId);
        } else {
            clothesList = clothesService.getClothesSortedByCreatedAtDesc(userId);
        }

        List<DtoStorage> items = storageService.getUserStorage(userId);

        model.addAttribute("userId", userId);
        model.addAttribute("clothesList", clothesList);
        model.addAttribute("items", items);
        model.addAttribute("order", order);

        System.out.println("Storages returned: " + clothesList);
        return "For-backend-verification/index_clothes";
    }

    @RequestMapping(method = RequestMethod.GET, value="/storages")
    public String getUserStorage(@PathVariable Long userId,
                                 @RequestParam(required = false, defaultValue = "CLOSET") StorageType storageType,
                                 Model model) {
        List<Storage> storagesByType = storageService.getStoragesByUserAndType(storageType, userId);
        model.addAttribute("storages", storagesByType);
        model.addAttribute("userId", userId);
        return "For-backend-verification/index_storage";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/storages/{storageId}")
    public String getStorageDetail(@PathVariable Long userId,
                                   @PathVariable Long storageId,
                                   @RequestParam(required = false) String storageType,
                                   Model model) {
        List<Clothes> getStorageByClothes = clothesService.findAllByUserIdAndStorageId(userId, storageId);
        Storage getStorage = storageService.findStorageByUserIdAndStorageId(userId, storageId);
      //  DresserStorage getDresser = dresserService.findById(storageId);
        model.addAttribute("clothesList", getStorageByClothes);
       // model.addAttribute("dresser", getDresser);
        model.addAttribute("storage", getStorage);

        // storageTypeに基づいて表示するテンプレートを切り替える
        switch (storageType) {
            case "DRESSER":
                DresserStorage getDresser = dresserService.findById(storageId);
                model.addAttribute("dresser", getDresser);
                return "For-backend-verification/detail_dresser"; // タンス用HTML
            case "CLOSET":
                return "For-backend-verification/detail_closet"; // クローゼット用HTML
            case "STORAGE_BAG":
                return "For-backend-verification/detail_storage_bag"; // 収納袋用HTML
            default:
                return "error_page"; // エラー
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "tag")
    public String getTag(@PathVariable Long userId,
                         Model model) {
        List<Tag> tagList = tagService.findAllTagByUserId(userId);
        model.addAttribute("userId", userId);
        model.addAttribute("tagList", tagList);

        return "/For-backend-verification/index_tag";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/tag/{tagId}")
    public String getClothesByUserAndTag(@PathVariable Long userId, @PathVariable Long tagId, Model model) {
        Tag tag = tagService.findById(tagId);
        model.addAttribute("tagName", tag.getName());
        model.addAttribute("tagColor", tag.getColor());

        List<Clothes> clothesList = clothesService.findClothesByUserIdAndTagId(userId, tagId);
        model.addAttribute("clothesList", clothesList);
        model.addAttribute("userId", userId);
        model.addAttribute("tagId", tagId);

        System.out.println("Clothes List Size: " + clothesList.size());
        for (Clothes clothes : clothesList) {
            System.out.println("Clothes Name: " + clothes.getName());
        }
        return "/For-backend-verification/detaile_tag"; // 表示するテンプレート名
    }
}
