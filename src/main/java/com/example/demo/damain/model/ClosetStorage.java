package com.example.demo.damain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClosetStorage {
    @Id
    @OneToOne
    @JoinColumn(name = "storage_id", nullable = false)
    private Storage storageId;

    @Column(nullable = false, length = 50)
    private Integer hunger_content;

    @Column(columnDefinition = "jsonb")
    private String shelfLayout;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
