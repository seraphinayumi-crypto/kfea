-- ============================================
-- KFEA 프로덕션 D1 데이터베이스 전체 설정
-- ============================================
-- Cloudflare 대시보드 D1 Console에서 실행
-- Database: kfea-production (81a7641d-edc4-47a1-bc45-8c39257556ba)
-- ============================================

-- STEP 1: 테이블 생성
-- 관리자 테이블
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 활동소식 (기사) 테이블
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  source TEXT DEFAULT '한국강사신문',
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES admins(id)
);

-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES admins(id)
);

-- 자료실 테이블
CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  downloads INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES admins(id)
);

-- 회원 테이블
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  interest TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 문의 테이블
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  replied_at DATETIME,
  replied_by INTEGER,
  FOREIGN KEY (replied_by) REFERENCES admins(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_notices_published ON notices(is_published);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- ============================================
-- STEP 2: 관리자 계정 추가
-- ============================================
INSERT OR IGNORE INTO admins (id, username, password_hash, email, name) VALUES 
  (1, 'admin', 'kfea2026!@', 'admin@kfea.ai.kr', '관리자');

-- ============================================
-- STEP 3: 활동소식 기사 데이터 (31건)
-- ============================================
INSERT OR IGNORE INTO articles (date, title, link, source, category) VALUES 
  ('2025-12-31', '한국면접관협회, 인문학 기반 면접관 마스터 자격과정 개최', 'https://www.lecturernews.com/news/articleView.html?idxno=194008', '한국강사신문', '한국면접관협회'),
  ('2025-12-30', '경기도교육청 평생학습관, 2025년 방과후지도사 양성과정 4기 운영 성료', 'https://www.lecturernews.com/news/articleView.html?idxno=193971', '한국강사신문', '한국미래인재교육협회'),
  ('2025-12-24', '[강사 인터뷰] 이제야 삶이 말이 되었다 이다인 강사를 만나다', 'https://www.lecturernews.com/news/articleView.html?idxno=193591', '한국강사신문', '한국면접관협회'),
  ('2025-12-16', '순천제일대학교, 최유미 강사 초청 맞춤형 산업-기업-직무분석 특강 개최', 'https://www.lecturernews.com/news/articleView.html?idxno=192951', '한국강사신문', '최유미'),
  ('2025-12-15', '한국미래인재교육협회-행복한진로심리이야기, NCS 진로심리검사 성료', 'https://www.lecturernews.com/news/articleView.html?idxno=192950', '한국강사신문', '한국미래인재교육협회'),
  ('2025-11-29', '서울시, 청년·시민참여형 AI 인재 행사 AI 인재 페스티벌 위크 개최', 'https://www.lecturernews.com/news/articleView.html?idxno=191654', '한국강사신문', '한국미래인재교육협회'),
  ('2025-11-28', '[주간강사] 한국강사에이전시가 김기연, 정진, 윤선동, 강은지 강사를 소개합니다', 'https://www.lecturernews.com/news/articleView.html?idxno=191647', '한국강사신문', '강은지'),
  ('2025-10-24', '[강은지의 이미지메이킹 인사이트] 첫인상이 당신의 미래를 결정한다', 'https://www.lecturernews.com/news/articleView.html?idxno=189268', '한국강사신문', '강은지'),
  ('2025-10-16', '피엑스알랩, AI 기반 성과창출형 면접평가 협력 MOU 체결', 'https://www.lecturernews.com/news/articleView.html?idxno=188762', '한국강사신문', '한국면접관협회'),
  ('2025-10-15', '[오늘의 강사] 한국강사에이전시, 이미지메이킹 분야 강은지 강사를 소개합니다', 'https://www.lecturernews.com/news/articleView.html?idxno=188684', '한국강사신문', '강은지'),
  ('2025-10-02', '[강사 인터뷰] 페이머스유 이미지메이킹센터 강은지 대표를 만나다', 'https://www.lecturernews.com/news/articleView.html?idxno=188067', '한국강사신문', '강은지'),
  ('2025-09-15', '한국면접관협회, 제23기 전문 면접관 마스터 교육과정 개최', 'https://www.lecturernews.com/news/articleView.html?idxno=186927', '한국강사신문', '한국면접관협회'),
  ('2025-09-15', '최유미 강사, 나사렛대학교서 취업을 앞당기는 노션 자기관리 전략 특강', 'https://www.lecturernews.com/news/articleView.html?idxno=186967', '한국강사신문', '최유미'),
  ('2025-08-26', '한국면접관협회, 면접관의 시선 북토크 성료', 'https://www.lecturernews.com/news/articleView.html?idxno=185652', '한국강사신문', '한국면접관협회'),
  ('2025-08-26', '한국면접관협회, 제1회 대한민국 면접관 컨퍼런스 성공리에 마쳐', 'https://www.lecturernews.com/news/articleView.html?idxno=185650', '한국강사신문', '한국면접관협회'),
  ('2025-08-11', '최유미 강사, 실무 중심 늘봄 방과후 강사 양성과정 2기 성료', 'https://www.lecturernews.com/news/articleView.html?idxno=184403', '한국강사신문', '최유미'),
  ('2025-08-08', '[기획 인터뷰] 한국면접관협회 권혁근 협회장을 만나다', 'https://www.lecturernews.com/news/articleView.html?idxno=184382', '한국강사신문', '한국면접관협회'),
  ('2025-08-08', '한국면접관협회, 면접관 마스터 포럼에서 전문가 인물브랜딩 전략 공개', 'https://www.lecturernews.com/news/articleView.html?idxno=182998', '한국강사신문', '한국면접관협회'),
  ('2025-08-08', '[오늘의 강사] 한국강사에이전시, 면접관교육 분야 권혁근 강사를 소개합니다', 'https://www.lecturernews.com/news/articleView.html?idxno=185657', '한국강사신문', '한국면접관협회'),
  ('2025-08-08', '천안·오산까지 결혼이주여성 대상 이중언어강사양성과정 성료', 'https://www.lecturernews.com/news/articleView.html?idxno=184400', '한국강사신문', '최유미'),
  ('2025-07-23', '경기도인재개발원, 최유미 강사 초청 본캐는 공무원 부캐는 강사 특강 개최', 'https://www.lecturernews.com/news/articleView.html?idxno=183192', '한국강사신문', '최유미'),
  ('2025-06-13', '색이 나를 설명한다, 퍼스널컬러에서 강의 동선까지 강은지 강사의 강의 철학', 'https://www.lecturernews.com/news/articleView.html?idxno=180382', '한국강사신문', '강은지'),
  ('2025-06-10', '대전교육청, 늘봄학교·중등 방과후학교 강사 운영 안내 자료 배포', 'https://www.lecturernews.com/news/articleView.html?idxno=180081', '한국강사신문', '교육정책'),
  ('2025-04-17', '한국미래인재교육협회 X 세무회계 소명, 종합소득세 신고 지원', 'https://www.lecturernews.com/news/articleView.html?idxno=176409', '한국강사신문', '한국미래인재교육협회'),
  ('2025-03-14', '[최유미의 커리어 디렉팅] 새로운 도약을 위한 준비, 경력단절 여성을 위한 재취업 전략', 'https://www.lecturernews.com/news/articleView.html?idxno=174248', '한국강사신문', '최유미'),
  ('2025-02-22', '한국미래인재교육협회, 프리랜서 강사를 위한 맞춤 세무관리 교육', 'https://www.lecturernews.com/news/articleView.html?idxno=172944', '한국강사신문', '한국미래인재교육협회'),
  ('2025-02-13', '교육부, 2025년 학교복합시설 1차 선정 공모 실시… 봄교실 현장실습장 구축', 'https://www.lecturernews.com/news/articleView.html?idxno=172342', '한국강사신문', '교육정책'),
  ('2025-02-06', '[오늘의 강사] 한국강사에이전시, 강사양성 분야 최유미 강사를 소개합니다', 'https://www.lecturernews.com/news/articleView.html?idxno=171702', '한국강사신문', '최유미'),
  ('2025-01-23', '인천남부교육지원청, 2025학년도 늘봄학교 프로그램 외부 강사 122명 선발', 'https://www.lecturernews.com/news/articleView.html?idxno=171052', '한국강사신문', '교육정책'),
  ('2025-01-15', '인천강화교육지원청, 늘봄(방과후)학교 프로그램 외부 강사 모집', 'https://www.lecturernews.com/news/articleView.html?idxno=170409', '한국강사신문', '교육정책'),
  ('2024-12-16', '한국강사신문 대표가 만난 강사, 한국미래인재교육협회 최유미 협회장 인터뷰', 'https://www.lecturernews.com/news/articleView.html?idxno=168376', '한국강사신문', '최유미');

-- ============================================
-- STEP 4: 공지사항 샘플 데이터
-- ============================================
INSERT OR IGNORE INTO notices (id, title, content, is_published, created_by) VALUES 
  (1, '2025년 겨울방학 늘봄방과후 전문강사 특별과정 모집', '2025학년도 신학기 대비 늘봄방과후 전문강사 양성과정을 개설합니다. 초등학교 방과후 프로그램 운영에 필요한 실무 능력을 집중적으로 배양하는 특별과정입니다.', 1, 1),
  (2, '2026학년도 대입 AI 면접 대비 특강 개최', '최신 AI 면접 트렌드 분석과 실전 연습을 통해 대입 면접을 완벽하게 준비하세요. AI 면접 시스템 체험 및 1:1 피드백이 제공됩니다.', 1, 1),
  (3, '온라인 강의실 시스템 업그레이드 완료', '더욱 편리해진 학습 관리 시스템으로 언제 어디서나 수준 높은 교육을 받으실 수 있습니다. 모바일 앱도 곧 출시될 예정입니다.', 1, 1);

-- ============================================
-- 완료! 확인 쿼리:
-- SELECT COUNT(*) FROM articles; -- 결과: 31
-- SELECT COUNT(*) FROM notices;  -- 결과: 3
-- SELECT COUNT(*) FROM admins;   -- 결과: 1
-- ============================================
