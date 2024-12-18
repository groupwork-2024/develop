package com.example.demo.app.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.net.URL;

@RestController
public class ImageProxyController {
    @GetMapping("/proxy/image")
    public ResponseEntity<byte[]> proxyImage(@RequestParam String imageUrl) {
        try {
            // 外部URLから画像データを取得
            URL url = new URL(imageUrl);
            InputStream inputStream = url.openStream();
            byte[] imageBytes = inputStream.readAllBytes();

            // レスポンスヘッダーにContent-Typeを設定
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // JPEGとして扱う（適切なMIMEタイプに変更）

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
