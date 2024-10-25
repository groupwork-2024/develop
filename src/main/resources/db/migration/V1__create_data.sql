-- ユーザーテーブル
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  body_type VARCHAR(255),
  user_icon LONGBLOB,
  age INT,
  height INT,
  gender VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 収納場所テーブル
CREATE TABLE storage (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  storage_type VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  CHECK (storage_type IN ('SHELF', 'CABINET', 'CLOSET')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- タンス固有情報テーブル
CREATE TABLE drawer_storage (
  storage_id BIGINT PRIMARY KEY,
  drawer_count INT NOT NULL,
  shelf_layout JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (storage_id) REFERENCES storage(id)
);

-- クローゼット固有情報テーブル
CREATE TABLE closet_storage (
  storage_id BIGINT PRIMARY KEY,
  hanger_count INT NOT NULL,
  shelf_layout JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (storage_id) REFERENCES storage(id)
);

-- 衣服情報テーブル
CREATE TABLE clothes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  storage_id BIGINT,
  name VARCHAR(255) NOT NULL,
  brand_name VARCHAR(255),
  description TEXT,
  image_data LONGBLOB,
  favorite BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (storage_id) REFERENCES storage(id)
);

-- タグ情報テーブル
CREATE TABLE tags (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  name VARCHAR(255) NOT NULL UNIQUE,
  color VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 衣服タグ中間テーブル
CREATE TABLE clothes_tags (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  clothes_id BIGINT,
  tag_id BIGINT,
  FOREIGN KEY (clothes_id) REFERENCES clothes(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);


