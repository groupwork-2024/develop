package com.example.demo.damain.repository;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.StorageType;
import com.example.demo.damain.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Integer> {
    List<Clothes> findAllByUserId(Long userId);

    List<Clothes> findAllByUserIdOrderByCreatedAtAsc(Long userId);

    List<Clothes> findAllByUserIdOrderByCreatedAtDesc(Long userId);

}
