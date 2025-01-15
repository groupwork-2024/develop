package com.example.demo.app.controller;

import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/location/{userId}")
public class SelectStorageController {
    @Autowired
    StorageService storageService;

    @RequestMapping(method = RequestMethod.GET)
    public List<DtoStorage> getUserStorage(@PathVariable Long userId) {
        return storageService.getUserStorage(userId);
    }
}
