package com.example.demo.damain.repository;

import com.example.demo.damain.model.ClosetStorage;
import com.example.demo.damain.model.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClosetStorageRepository extends JpaRepository<ClosetStorage, Long> {
}
