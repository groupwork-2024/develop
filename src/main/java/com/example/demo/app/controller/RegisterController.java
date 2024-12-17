package com.example.demo.app.controller;

import com.example.demo.app.dto.DtoCloset;
import com.example.demo.app.dto.DtoDresser;
import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.model.*;
import com.example.demo.damain.service.ClothesService;
import com.example.demo.damain.service.S3StorageService;
import com.example.demo.damain.service.StorageService;
import com.example.demo.damain.service.UserService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<Void> addClothes(@PathVariable Long userId,
                                           @RequestBody Clothes clothes,
                                           Model model){
        User user = userService.findById(userId);
        clothes.setUser(user);

        clothesService.saveClothes(clothes);
        return ResponseEntity.ok().build();



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
                                           @RequestBody DtoDresser dresser,
                                           Model model) {
        //Userオブジェクト取得
        User user = userService.findById(userId);

        //Storageエンティティに値をセット
        Storage storage = new Storage();
        storage.setName(dresser.getName());
        storage.setStorageType(StorageType.DRESSER);
        storage.setImageData(dresser.getImageData());
        storage.setUser(user);
        Storage saveStorage = storageService.saveStorage(storage);

        //DresserStorageエンティティに値をセット
        DresserStorage dresserStorage = new DresserStorage();
        dresserStorage.setStorage(saveStorage);
        dresserStorage.setDrawerCount(dresser.getDrawerCount());
        storageService.saveDresserStorage(dresserStorage);

        return ResponseEntity.ok().build();
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
            @RequestParam("hanger_count") int hangerCount,
            @RequestParam("image") MultipartFile file) {
        try {
            // Service層でビジネスロジックを処理
            storageService.addCloset(userId, name, hangerCount, file);
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
                                        @RequestParam("image") MultipartFile file,
                                        Model model) {
        try {
            // Service層でビジネスロジックを処理
            storageService.addBags(userId, name, file);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
