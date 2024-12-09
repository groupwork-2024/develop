package com.example.demo.app.controller;

import com.example.demo.damain.service.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("register/{userId}")
public class RegisterController {
    @Autowired
    ClothesService clothesService;

    @RequestMapping(method = RequestMethod.GET)
    public String sectionMenu(@PathVariable Long userId,
                              Model model) {
        return "choice_storage";
    }
    @RequestMapping(method = RequestMethod.GET, value="/clothes")
    public String getUserClothes(@PathVariable Long userId,
                                 Model model){
        model.addAttribute("userId", userId);
        return "add_clothes";
    }
    @RequestMapping(method = RequestMethod.POST, value="/clothes")
    public void addClothes(@PathVariable Long userId){

    }
}
