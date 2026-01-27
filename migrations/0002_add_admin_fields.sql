-- 관리자 테이블에 role과 is_active 컬럼 추가
ALTER TABLE admins ADD COLUMN role TEXT DEFAULT 'admin';
ALTER TABLE admins ADD COLUMN is_active INTEGER DEFAULT 1;

-- 기존 관리자에게 role 설정
UPDATE admins SET role = 'admin' WHERE role IS NULL;
UPDATE admins SET is_active = 1 WHERE is_active IS NULL;
