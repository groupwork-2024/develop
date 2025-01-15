package com.example.demo.damain.repository;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.ClothesTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClothesTagsRepository extends JpaRepository<ClothesTag, Integer> {

    @Query("""
    SELECT DISTINCT c FROM Clothes c
    LEFT JOIN FETCH c.tags t
    JOIN ClothesTag ct ON c.id = ct.clothes.id
    WHERE c.user.id = :userId AND :tagId IN (SELECT t.id FROM c.tags t)
""")
    List<Clothes> findClothesByUserIdAndTagIdWithAllTags(@Param("userId") Long userId, @Param("tagId") Long tagId);

    void deleteByClothes(Clothes clothes);

    List<ClothesTag> findByClothes(Clothes clothes);

    void deleteByClothesId(Long clothesId);
}
