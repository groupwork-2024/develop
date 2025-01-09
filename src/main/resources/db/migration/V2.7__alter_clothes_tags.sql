-- 外部キー制約を再作成（ON DELETE CASCADEを追加）
ALTER TABLE clothes_tags
ADD CONSTRAINT clothes_tags_ibfk_1
FOREIGN KEY (clothes_id) REFERENCES clothes(id) ON DELETE CASCADE;

ALTER TABLE clothes_tags
ADD CONSTRAINT clothes_tags_ibfk_2
FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE;
