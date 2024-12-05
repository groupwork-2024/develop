package com.example.demo.damain.service;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class StorageService {
    @Autowired
    StorageRepository storageRepository;

    public List<Storage> findAllStorageByUserId(Long userId) {
        return storageRepository.findAllByUserId(userId);
    }

    public List<Storage> getStoragesByUserAndType(StorageType storageType, Long userId) {
        List<Storage> storagesList = storageRepository.findAllByUserIdAndStorageType(userId, storageType);

        for (Storage storages : storagesList) {
            if (storages.getImageData() != null) {
                // エンコードして文字列として設定
                storages.setImageDataString(Base64.getEncoder().encodeToString(storages.getImageData()));
            }
        }
        return storagesList;
    }
}
