package com.example.demo.damain.service;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.repository.ClothesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;

@Service
public class ClothesService {
    @Autowired
    ClothesRepository clothesRepository;

    // 服一覧参照
    public List<Clothes> findAllClothesByUserId(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserId(userId);
        return clothesList;
    }

    public List<Clothes> getClothesSortedByCreateAtAsc(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserIdOrderByCreatedAtAsc(userId);

        return clothesList;
    }

    public List<Clothes> getClothesSortedByCreatedAtDesc(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        return clothesList;
    }

    public List<Clothes> findAllByUserIdAndStorageId(Long userId, Long storageId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserIdAndStorageId(userId, storageId);
        return clothesList;
    }

    public void addClothes(Long userId) {
    }

    @Transactional
    public void saveClothes(Clothes clothes) {
        clothesRepository.save(clothes);
    }
}
