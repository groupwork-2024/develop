package com.example.demo.damain.service;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.model.User;
import com.example.demo.damain.repository.ClothesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class ClothesService {
    @Autowired
    ClothesRepository clothesRepository;

    // 服一覧参照
    public List<Clothes> findAllClothesByUserId(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserId(userId);

        // 画像データをBase64エンコード
        for (Clothes clothes : clothesList) {
            if (clothes.getImageData() != null) {
                // エンコードして文字列として設定
                clothes.setImageDataString(Base64.getEncoder().encodeToString(clothes.getImageData()));
            }
        }
        return clothesList;
    }

    public List<Clothes> getClothesSortedByCreateAtAsc(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserIdOrderByCreatedAtAsc(userId);

        // 画像データをBase64エンコード
        for (Clothes clothes : clothesList) {
            if (clothes.getImageData() != null) {
                // エンコードして文字列として設定
                clothes.setImageDataString(Base64.getEncoder().encodeToString(clothes.getImageData()));
            }
        }
        return clothesList;
    }

    public List<Clothes> getClothesSortedByCreatedAtDesc(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        // 画像データをBase64エンコード
        for (Clothes clothes : clothesList) {
            if (clothes.getImageData() != null) {
                // エンコードして文字列として設定
                clothes.setImageDataString(Base64.getEncoder().encodeToString(clothes.getImageData()));
            }
        }
        return clothesList;
    }

    public List<Clothes> findAllByUserIdAndStorageId(Long userId, Long storageId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserIdAndStorageId(userId, storageId);
        for (Clothes clothes : clothesList) {
            if (clothes.getImageData() != null) {
                // エンコードして文字列として設定
                clothes.setImageDataString(Base64.getEncoder().encodeToString(clothes.getImageData()));
            }
        }
        return clothesList;
    }
    
    public void addClothes(Long userId){
    }
}
