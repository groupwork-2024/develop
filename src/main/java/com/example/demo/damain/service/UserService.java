package com.example.demo.damain.service;

import com.example.demo.damain.model.User;
import com.example.demo.damain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    S3StorageService s3StorageService;

    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User saveIcon(Long userId, MultipartFile image) throws IOException {
        User user = findById(userId);

        // 既存のアイコンURLを取得
        String oldIconUrl = user.getUserIcon();

        // 新しい画像をS3にアップロード
        String newIconUrl = s3StorageService.uploadFile("usericon", image);

        // 既存の画像を削除
        if (oldIconUrl != null && !oldIconUrl.isEmpty()) {
            s3StorageService.deleteFile(oldIconUrl); // S3から過去の画像を削除
        }

        // 新しいアイコンURLをユーザーに設定
        user.setUserIcon(newIconUrl);
        return userRepository.save(user);
    }
}
