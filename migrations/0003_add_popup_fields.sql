-- 공지사항에 팝업 관련 필드 추가
ALTER TABLE notices ADD COLUMN is_popup BOOLEAN DEFAULT 0;
ALTER TABLE notices ADD COLUMN popup_image_url TEXT;
ALTER TABLE notices ADD COLUMN popup_start_date DATE;
ALTER TABLE notices ADD COLUMN popup_end_date DATE;
