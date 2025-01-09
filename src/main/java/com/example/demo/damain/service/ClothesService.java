package com.example.demo.damain.service;

import com.example.demo.damain.model.*;
import com.example.demo.damain.repository.ClothesRepository;
import com.example.demo.damain.repository.ClothesTagsRepository;
import com.example.demo.damain.repository.TagRepository;
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
    TagRepository tagRepository;

    @Autowired
    S3StorageService s3StorageService;

    // 服一覧参照
    public List<Clothes> findAllClothesByUserId(Long userId) {
        List<Clothes> clothesList = clothesRepository.findAllByUserId(userId);
        return clothesList;
    }

    public List<Clothes> getClothesSortedByCreateAtAsc(Long userId) {
        return clothesRepository.findClothesWithTagsByUserIdAsc(userId);
    }

    public List<Clothes> getClothesSortedByCreatedAtDesc(Long userId) {
        return clothesRepository.findClothesWithTagsByUserIdDesc(userId);
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

    @Transactional
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
            System.out.println("Processing tag: ID=" + tag.getId() + ", Name=" + tag.getName());
            tag = tagRepository.findByName(tag.getName());
            ClothesTag clothesTags = new ClothesTag();
            clothesTags.setClothes(savedClothes);
            clothesTags.setTag(tag);
            clothesTagsRepository.save(clothesTags);
        }

        return savedClothes;
    }

    public List<Clothes> findClothesByUserIdAndTagId(Long userId, Long tagId) {
        return clothesTagsRepository.findClothesByUserIdAndTagIdWithAllTags(userId, tagId);
    }

    public boolean deleteClothesById(Long id) {
        try {
            if (clothesRepository.existsById(id)) {
                clothesRepository.deleteById(id); // 削除実行
                return true; // 削除成功
            }
            return false; // 削除対象が存在しない
        } catch (Exception e) {
            // 必要に応じてログを記録する
            System.err.println("削除に失敗しました: " + e.getMessage());
            return false; // 削除失敗
        }
    }
}
