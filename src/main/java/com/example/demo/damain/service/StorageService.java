package com.example.demo.damain.service;

import com.example.demo.app.dto.DtoStorage;
import com.example.demo.damain.model.ClosetStorage;
import com.example.demo.damain.model.DresserStorage;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.repository.ClosetStorageRepository;
import com.example.demo.damain.repository.DresserStorageRepository;
import com.example.demo.damain.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Storage findStorageByUserIdAndStorageId(Long userId, Long storageId) {
        Optional<Storage> optionalStorage = storageRepository.findStorageByUserIdAndId(userId, storageId);
        Storage storage = optionalStorage.orElseThrow(() ->
                new NoSuchElementException("Storage not found for userId: " + userId + ", storageId: " + storageId));
        if (storage.getImageData() != null) {
            storage.setImageDataString(Base64.getEncoder().encodeToString(storage.getImageData()));
        }
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
}
