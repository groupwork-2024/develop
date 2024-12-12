package com.example.demo.damain.repository;

import com.example.demo.damain.model.DresserStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DresserStorageRepository extends JpaRepository<DresserStorage, Long> {
}
