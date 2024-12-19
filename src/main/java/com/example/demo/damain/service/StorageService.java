package com.example.demo.damain.service;

import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.model.*;
import com.example.demo.damain.repository.ClosetStorageRepository;
import com.example.demo.damain.repository.DresserStorageRepository;
import com.example.demo.damain.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StorageService {
    @Autowired
    StorageRepository storageRepository;

    @Autowired
    ClosetStorageRepository closetStorageRepository;

    @Autowired
    DresserStorageRepository dresserStorageRepository;

    @Autowired
    UserService userService;

    @Autowired
    S3StorageService s3StorageService;

    public List<Storage> findAllStorageByUserId(Long userId) {
        return storageRepository.findAllByUserId(userId);
    }

    public List<Storage> getStoragesByUserAndType(StorageType storageType, Long userId) {
        List<Storage> storagesList = storageRepository.findAllByUserIdAndStorageType(userId, storageType);
        return storagesList;
    }

    public Storage findStorageByUserIdAndStorageId(Long userId, Long storageId) {
        Optional<Storage> optionalStorage = storageRepository.findStorageByUserIdAndId(userId, storageId);
        Storage storage = optionalStorage.orElseThrow(() ->
                new NoSuchElementException("Storage not found for userId: " + userId + ", storageId: " + storageId));
        return storage;
    }

    public List<DtoStorage> getUserStorage(Long userId) {
        List<Storage> storagesList = storageRepository.findAllByUserId(userId);

        return storagesList.stream()
                .map(storage -> new DtoStorage(storage.getId(), storage.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public Storage saveStorage(Storage storage) {
        return storageRepository.save(storage);
    }

    @Transactional
    public void saveClosetStorage(ClosetStorage closetStorage) {
        closetStorageRepository.save(closetStorage);
    }

    @Transactional
    public void saveDresserStorage(DresserStorage dresserStorage) {
        dresserStorageRepository.save(dresserStorage);
    }

    public void addCloset(Long userId, String name, int hangerCount, MultipartFile file) throws IOException {
        // ユーザー情報を取得
        User user = userService.findById(userId);

        // ファイルをS3にアップロード
        String imageUrl = s3StorageService.uploadFile("storage", file);

        // Storageエンティティを作成して保存
        Storage storage = new Storage();
        storage.setName(name);
        storage.setStorageType(StorageType.CLOSET);
        storage.setImageUrl(imageUrl);
        storage.setUser(user);
        Storage savedStorage = saveStorage(storage);

        // ClosetStorageエンティティを作成して保存
        ClosetStorage closetStorage = new ClosetStorage();
        closetStorage.setStorage(savedStorage);
        closetStorage.setHanger_count(hangerCount);
        saveClosetStorage(closetStorage);
    }

    public void addBags(Long userId, String name, MultipartFile file) throws IOException {
        // ユーザー情報を取得
        User user = userService.findById(userId);

        // ファイルをS3にアップロード
        String imageUrl = s3StorageService.uploadFile("storage", file);

        // Storageエンティティを作成して保存
        Storage storage = new Storage();
        storage.setName(name);
        storage.setStorageType(StorageType.STORAGE_BAG);
        storage.setImageUrl(imageUrl);
        storage.setUser(user);
        saveStorage(storage);
    }

    public void addDresser(Long userId, String name, Integer drawerCount, MultipartFile file) throws IOException {
        // ユーザー情報を取得
        User user = userService.findById(userId);

        // ファイルをS3にアップロード
        String imageUrl = s3StorageService.uploadFile("storage", file);

        // Storageエンティティを作成して保存
        Storage storage = new Storage();
        storage.setName(name);
        storage.setStorageType(StorageType.DRESSER);
        storage.setImageUrl(imageUrl);
        storage.setUser(user);
        Storage savedStorage = saveStorage(storage);

        //DresserStorageエンティティを作成して保存
        DresserStorage dresserStorage = new DresserStorage();
        dresserStorage.setStorage(savedStorage);
        dresserStorage.setDrawerCount(drawerCount);
        saveDresserStorage(dresserStorage);
    }
}
