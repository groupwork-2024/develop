package com.example.demo.damain.service;

import com.example.demo.damain.model.Tag;
import com.example.demo.damain.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TagService {
    @Autowired
    TagRepository tagRepository;

    public List<Tag> findAllTagByUserId(Long userId) {
        return tagRepository.findAllByUserId(userId);
    }

    @Transactional
    public Tag createTag(Tag tagRequest) {
        Tag tag = new Tag();
        tag.setName(tagRequest.getName());
        tag.setUser(tagRequest.getUser());
        tag.setColor(tagRequest.getColor());
        return tagRepository.save(tag);
    }

    public Tag findById(Long tagId) {
        return tagRepository.findById(tagId);
    }
}
