package com.example.demo.app.controller;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.Tag;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.StorageService;
import com.example.demo.damain.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("others/{userId}")
public class OthersController {

    @Autowired
    ClothesService clothesService;

    @Autowired
    StorageService storageService;

    @Autowired
    TagService tagService;

    @RequestMapping(method = RequestMethod.GET, value ="my-page")
    public String getMyPage(@PathVariable Long userId,
                            Model model) {
        return "/For-backend-verification/mypage";
    }

    @RequestMapping(method = RequestMethod.GET, value = "favorite")
    public String getFavorite(@PathVariable Long userId,
                              Model model) {
        return "/For-backend-verification/nice";
    }

    @RequestMapping(method = RequestMethod.GET, value = "inquiry")
    public String getInquiry(@PathVariable Long userId,
                             Model model) {
        return "/For-backend-verification/enquiry";
    }

    @RequestMapping(method = RequestMethod.GET, value = "search")
    public String handleSearchRequest(@PathVariable Long userId,
                                      @RequestParam(required = false, defaultValue = "clothes") String category,
                                      Model model) {
        // HTMLを返す（通常のリクエスト用）
        List<Clothes> clothes = clothesService.findAllClothesByUserId(userId);
        model.addAttribute("userId", userId);
        model.addAttribute("items", clothes);
        model.addAttribute("category", "clothes");
        return "For-backend-verification/search"; // テンプレート名を返す
    }

    @RequestMapping(method = RequestMethod.GET, value = "/ajax/search")
    @ResponseBody
    public Object getAjaxSearchData(@PathVariable Long userId,
                                    @RequestParam(required = false, defaultValue = "clothes") String category) {
        return switch (category) {
            case "clothes" -> clothesService.findAllClothesByUserId(userId);
            case "storage" -> storageService.findAllStorageByUserId(userId);
            case "tags" -> tagService.findAllTagByUserId(userId);
            default -> throw new IllegalArgumentException("Invalid category");
        };
    }


}
