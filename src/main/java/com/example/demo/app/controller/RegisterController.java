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
        return "For-backend-verification/choice_register";
    }
    @RequestMapping(method = RequestMethod.GET, value="/clothes")
    public String getUserClothes(@PathVariable Long userId,
                                 Model model){
        return "For-backend-verification/add_clothes";
    }
    @RequestMapping(method = RequestMethod.POST, value="/clothes")
    public void addClothes(@PathVariable Long userId){

    }

    @RequestMapping(method = RequestMethod.GET, value="/storages")
    public String choiceStorage(@PathVariable Long userId,
                                Model model) {
        return "For-backend-verification/choice_storage";
    }

    @RequestMapping(method = RequestMethod.GET, value="/storages/dresser")
    public String addDresser(@PathVariable Long userId,
                                Model model) {
        return "For-backend-verification/add_dresser";
    }

    @RequestMapping(method = RequestMethod.GET, value="/storages/closet")
    public String addCloset(@PathVariable Long userId,
                                Model model) {
        return "For-backend-verification/add_closet";
    }

    @RequestMapping(method = RequestMethod.GET, value="/storages/bags")
    public String addStorageBags(@PathVariable Long userId,
                                Model model) {
        return "For-backend-verification/add_storage_bag";
    }


}
