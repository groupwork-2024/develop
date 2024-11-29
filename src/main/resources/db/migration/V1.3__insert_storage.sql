-- タンス固有情報テーブルにデータを挿入
INSERT INTO drawer_storage (storage_id, drawer_count, shelf_layout) VALUES
(5, 5, JSON_OBJECT('layout', '3x2')),
(1, 3, JSON_OBJECT('layout', '1x3')),
(8, 4, JSON_OBJECT('layout', '2x2'));

-- クローゼット固有情報テーブルにデータを挿入
INSERT INTO closet_storage (storage_id, hanger_count, shelf_layout) VALUES
(3, 10, JSON_OBJECT('layout', '5x2')),
(4, 15, JSON_OBJECT('layout', '3x5')),
(7, 20, JSON_OBJECT('layout', '4x5')),
(9, 12, JSON_OBJECT('layout', '3x4'));
