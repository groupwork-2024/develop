package com.example.demo.app.controller;

import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.User;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.StorageService;
import com.example.demo.damain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("register/{userId}")
public class RegisterController {
    @Autowired
    ClothesService clothesService;

    @Autowired
    UserService userService;

    @Autowired
    StorageService storageService;

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

    @RequestMapping(method = RequestMethod.POST, value = "/storages/dresser")
    public ResponseEntity<Void> addDresser(@PathVariable Long userId,
                                           @RequestBody Storage storage,
                                           Model model) {
        //Userオブジェクト取得
        User user = userService.findById(userId);
        storage.setUser(user);

        //
        Storage saveDresser = storageService.addDresser(storage);
        return ResponseEntity.ok().build();
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
