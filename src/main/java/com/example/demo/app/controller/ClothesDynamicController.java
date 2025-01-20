package com.example.demo.app.controller;

import com.example.demo.app.dto.ClothesRequest;
import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Tag;
import com.example.demo.damain.service.ClothesService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clothes")
public class ClothesDynamicController {
    @Autowired
    private ClothesService clothesService;

    @RequestMapping(method = RequestMethod.GET, value = "{userId}")
    public List<Clothes> getClothingList(@PathVariable Long userId) {
        return clothesService.getClothesSortedByCreatedAtDesc(userId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/storage/{storageId}")
    public  List<Clothes> getStorageClothes(@PathVariable Long userId,
                                            @PathVariable Long storageId) {
        return clothesService.getClothesSortedByCreateAtDescBystorageId(userId, storageId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{id}")
    public ResponseEntity<Void> deleteClothes(@PathVariable Long id) {
        boolean isDeleted = clothesService.deleteClothesById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.POST, value="/edit")
    public ResponseEntity<?> getClothesData(@RequestBody ClothesRequest request) {
        try {
            // userId と clothesId をリクエストから取得
            Long userId = request.getUserId();
            Long clothesId = request.getClothesId();

            // サービス層から洋服データを取得
            Clothes clothes = clothesService.getClothesById(userId, clothesId);

            // レスポンスとしてデータを返却
            return ResponseEntity.ok(clothes);
        } catch (Exception e) {
            // エラーが発生した場合は 400 または 500 を返却
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("データの取得に失敗しました");
        }
    }

    @RequestMapping(method = RequestMethod.POST, value="/{userId}/edit/{clothesId}")
    public ResponseEntity<Clothes> editClothes(@PathVariable Long userId,
                                               @PathVariable Long clothesId,
                                               @RequestParam("name") String name,
                                               @RequestParam("brandName") String brandName,
                                               @RequestParam("storageId") Long storageId,
                                               @RequestParam("description") String description,
                                               @RequestParam(value = "image", required = false) MultipartFile image,
                                               @RequestParam("tags") String tagsJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Tag> tags = objectMapper.readValue(tagsJson, new TypeReference<List<Tag>>() {});
            Clothes editClothes = clothesService.editClothes(userId,clothesId, name, brandName, storageId, description, image, tags);
            return ResponseEntity.ok(editClothes);
        } catch (Exception e) {
            e.printStackTrace(); // 詳細な例外情報をログに出力
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
