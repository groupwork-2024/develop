package com.example.demo.damain.repository;

import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {
    List<Storage> findAllByUserId(Long userId);

    List<Storage> findAllByUserIdAndStorageType(Long userId, StorageType storageType);
}
