package com.example.demo.damain.repository;

import com.example.demo.damain.model.DresserStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DresserRepository extends JpaRepository<DresserStorage, Long> {

    Optional<DresserStorage> findByStorageId(Long storageId);
}
