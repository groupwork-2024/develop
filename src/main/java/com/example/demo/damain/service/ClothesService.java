package com.example.demo.damain.service;

import com.example.demo.damain.model.*;
import com.example.demo.damain.repository.ClothesRepository;
import com.example.demo.damain.repository.ClothesTagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class ClothesService {
    @Autowired
    ClothesRepository clothesRepository;

    @Autowired
    UserService userService;

    @Autowired
    StorageService storageService;

    @Autowired
    ClothesTagsRepository clothesTagsRepository;

    @Autowired
    S3StorageService s3StorageService;



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

    public Clothes registerClothes(Long userId, String name, String brandName, Long storageId, String description, MultipartFile image, List<Tag> tags) throws IOException {
        // ユーザー情報を取得
        User user = userService.findById(userId);

        //収納情報を取得
        Storage storage = storageService.findById(storageId);

        // ファイルをS3にアップロード
        String imageUrl = s3StorageService.uploadFile("clothes", image);

        // Clothesエンティティを作成
        Clothes clothes = new Clothes();
        clothes.setUser(user);
        clothes.setStorage(storage);
        clothes.setName(name);
        clothes.setBrandName(brandName);
        clothes.setDescription(description);
        clothes.setImageUrl(imageUrl);

        Clothes savedClothes = clothesRepository.save(clothes);

        // 中間テーブルに登録
        for (Tag tag : tags) {
            ClothesTag clothesTags = new ClothesTag();
            clothesTags.setClothes(savedClothes);
            clothesTags.setTag(tag);
            clothesTagsRepository.save(clothesTags);
        }

        return savedClothes;
    }
}
