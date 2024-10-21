package com.example.demo.damain.repository;

import com.example.demo.damain.model.Clothes;
import com.example.demo.damain.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesRepository extends JpaRepository<Clothes, Integer> {
}
