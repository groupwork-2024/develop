package com.example.demo.damain.repository;

import com.example.demo.damain.model.Storage;
import com.example.demo.damain.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageRepository extends JpaRepository<Storage, Long> {
}
