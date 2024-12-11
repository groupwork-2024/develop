package com.example.demo.app.controller;

import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("register/{userId}")
public class RegisterController {
    @Autowired
    ClothesService clothesService;

    @Autowired
    StorageService storageService;

    @RequestMapping(method = RequestMethod.GET)
    public String sectionMenu(@PathVariable Long userId,
                              Model model) {
        return "/choice_register";
    }
    @RequestMapping(method = RequestMethod.GET, value="/clothes")
    public String getUserClothes(@PathVariable Long userId,
                                 Model model){
        model.addAttribute("userId", userId);
        List<DtoStorage> items = storageService.getUserStorage(userId);
        model.addAttribute("items", items);
        return "/For-backend-verification/add_clothes";
    }
    //@RequestMapping(method = RequestMethod.POST, value="/clothes")
    //public ResponseEntity<Void> addClothes(@PathVariable Long userId,
    //                                       @RequestBody Clothes clothes,
    //                                       Model model){
    //    model.addAttribute("userId", userId);
    //
    //}
}
