package com.example.demo.damain.repository;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes,Long> {
    List<Clothes> findAllByUserId(Long userId);

    List<Clothes> findAllByUserIdOrderByCreatedAtAsc(Long userId);

    List<Clothes> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    List<Clothes> findAllByUserIdAndStorageId(Long userId, Long storageId);

}
