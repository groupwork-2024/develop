package com.example.demo.app.controller;

import com.example.demo.damain.model.Tag;
import com.example.demo.damain.model.User;
import com.example.demo.damain.service.TagService;
import com.example.demo.damain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tags/{userId}")
public class TagController {

    @Autowired
    private TagService tagService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody Tag tagRequest,
                                         @PathVariable Long userId) {
        User user = userService.findById(userId);
        tagRequest.setUser(user);
        Tag newTag = tagService.createTag(tagRequest);
        return ResponseEntity.ok(newTag);
    }
}
