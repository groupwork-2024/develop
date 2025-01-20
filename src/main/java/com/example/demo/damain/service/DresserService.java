package com.example.demo.damain.service;

import com.example.demo.damain.model.DresserStorage;
import com.example.demo.damain.model.Storage;
import com.example.demo.damain.repository.DresserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class DresserService {

    @Autowired
    DresserRepository dresserRepository;

    public DresserStorage findById(Long storageId) {
        Optional<DresserStorage> optionalStorage = dresserRepository.findByStorageId(storageId);
        DresserStorage storage = optionalStorage.orElseThrow(() ->
                new NoSuchElementException("storageId: " + storageId));
        return storage;
    }
}
