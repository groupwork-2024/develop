package com.example.demo.damain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clothes_tags")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothesTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clothes_id", nullable = false)
    private Clothes clothesId;

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tagId;
}
