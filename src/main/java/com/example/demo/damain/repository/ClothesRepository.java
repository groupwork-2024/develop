package com.example.demo.damain.repository;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes,Long> {
    List<Clothes> findAllByUserId(Long userId);

    @Query("SELECT c FROM Clothes c LEFT JOIN FETCH c.tags WHERE c.user.id = :userId ORDER BY c.createdAt DESC")
    List<Clothes> findClothesWithTagsByUserIdDesc(@Param("userId") Long userId);

    @Query("SELECT c FROM Clothes c LEFT JOIN FETCH c.tags WHERE c.user.id = :userId ORDER BY c.createdAt ASC")
    List<Clothes> findClothesWithTagsByUserIdAsc(@Param("userId") Long userId);

    List<Clothes> findAllByUserIdAndStorageId(Long userId, Long storageId);

    Optional<Clothes> findByUserIdAndId(Long userId, Long clothesId);

    List<Clothes> findByUserIdAndStorageIdOrderByCreatedAtDesc(Long userId, Long storageId);
}
