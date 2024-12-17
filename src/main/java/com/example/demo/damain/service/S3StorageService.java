package com.example.demo.damain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3StorageService {

    @Autowired
    private S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String uploadFile(String folder, MultipartFile file) throws IOException {

        // フォルダ名が指定されていれば、"/"を末尾に追加する
        String folderPath = folder != null && !folder.isEmpty() ? folder + "/" : "";

        // ファイル名にUUIDを付与して一意にする
        String uniqueFileName = folderPath + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // PutObjectRequestを作成
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueFileName) // フォルダ名 + ファイル名
                .build();

        // ファイル内容をRequestBodyに変換し、S3にアップロード
        s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));

        // アップロードされたファイルのURLを返す
        return String.format("https://%s.s3.amazonaws.com/%s", bucketName, uniqueFileName);
    }
}
