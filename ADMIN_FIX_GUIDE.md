# 관리자 모드 오류 수정 가이드

## 🔍 문제 분석

### 현재 상황
1. ✅ **로그인 API 작동 정상**: `POST /admin/api/login` 정상 응답
2. ✅ **공지사항 API 작동 정상**: `GET /admin/api/notices` (토큰 인증 후) 정상 응답
3. ❌ **프론트엔드 접근 실패**: 관리자 페이지 접속 시 로그인 페이지로 리다이렉트
4. ❌ **프로덕션 DB 데이터 부족**: 공지사항 1개만 존재 (4개 필요)

### 근본 원인
- **프로덕션 DB에 데이터가 부족함**: notices 테이블에 1개 공지사항만 존재
- **프로덕션 DB 직접 접근 권한 문제**: wrangler CLI로 원격 DB 접근 시 권한 오류

---

## ✅ 해결 방법

### 1단계: Cloudflare D1 Console 접속

1. **Cloudflare Dashboard 로그인**
   - URL: https://dash.cloudflare.com/27cefc8323900e7506870d222bed0ab8/workers-and-pages/d1

2. **kfea-production 데이터베이스 선택**
   - Database ID: `81a7641d-edc4-47a1-bc45-8c39257556ba`
   - 왼쪽 목록에서 "kfea-production" 클릭

3. **Console 탭 열기**
   - 상단 탭에서 "Console" 선택
   - SQL 쿼리 입력창 표시됨

---

### 2단계: 데이터베이스 설정 SQL 실행

**중요: 아래 SQL들을 반드시 하나씩 순서대로 실행하세요!**

#### ① 현재 테이블 확인
```sql
SELECT name FROM sqlite_master WHERE type='table';
```
**예상 결과**: `admins`, `notices`, `articles` 등 테이블 목록 표시

---

#### ② admins 테이블 생성 (없으면)
```sql
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

#### ③ notices 테이블 생성 (없으면)
```sql
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published INTEGER DEFAULT 1,
  is_popup INTEGER DEFAULT 0,
  popup_image_url TEXT,
  popup_start_date DATE,
  popup_end_date DATE,
  views INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

#### ④ admin 계정 삽입
```sql
INSERT OR IGNORE INTO admins (id, username, password_hash, email, name, role, is_active, created_at, updated_at)
VALUES (1, 'admin', 'kfea2026!@', 'admin@kfea.ai.kr', '관리자', 'admin', 1, '2026-02-24 00:00:00', '2026-02-24 00:00:00');
```
**예상 결과**: `1 row inserted` 또는 `0 rows affected` (이미 존재하면)

---

#### ⑤ 현재 공지사항 확인
```sql
SELECT id, title, is_published, is_popup, LENGTH(content) as content_length FROM notices ORDER BY created_at DESC;
```
**예상 결과**: 현재 등록된 공지사항 목록 표시

---

#### ⑥ 기존 공지사항 삭제
```sql
DELETE FROM notices WHERE id = 1;
```

---

#### ⑦ 공지사항 4개 삽입

**공지사항 1번 (팝업 공지사항):**
```sql
INSERT INTO notices (id, title, content, is_published, is_popup, popup_image_url, popup_start_date, popup_end_date, created_at, views)
VALUES (
  1,
  '늘봄+제로웨이스트 강사 자격증 특강 (2종 자격증 동시 발급)',
  '🌱 2026년 교육부 예산지원 강사 특별 과정

📅 일정:
• 늘봄방과후 지도사: 2026년 3월 8일(토) 10:00-17:00
• 제로웨이스트 강사: 2026년 3월 15일(일) 10:00-17:00

💰 수강료:
• 정상가: 280,000원
• 패키지 할인가: 230,000원 (50,000원 할인!)
• SNS 후기 작성 시 10,000원 추가 환급

👥 모집 대상:
• 예비 강사 및 현직 교사
• 방과후 교육에 관심 있는 분
• 환경교육 강사 준비 중인 분
• 자격증 취득을 원하는 모든 분

📝 신청 방법:
1. 네이버 블로그 공지사항 확인
2. 구글폼을 통한 온라인 신청
3. 수강료 입금 후 접수 완료

📝 자세한 내용: https://blog.naver.com/aw_yumic/224194292359
📞 문의: 010-3450-1117

🎯 특별 혜택:
• 수료 시 자격증 2종 동시 발급
• 교육 자료 제공
• 강사 활동 지원
• 네트워킹 기회 제공',
  1,
  1,
  'https://www.genspark.ai/api/files/s/TQqamezQ',
  '2026-02-22',
  '2026-03-15',
  '2026-02-24 19:50:46',
  0
);
```

**공지사항 2번:**
```sql
INSERT OR IGNORE INTO notices (id, title, content, is_published, is_popup, created_at, views)
VALUES (
  2,
  '2025년 겨울방학 늘봄방과후 전문강사 특별과정 모집',
  '# 2025년 겨울방학 늘봄방과후 전문강사 특별과정 모집

## 과정 개요
한국미래인재교육협회에서 2025년 겨울방학을 맞아 늘봄방과후 전문강사 양성 특별과정을 진행합니다.

## 교육 일정
- **기간**: 2025년 1월 6일 ~ 1월 24일 (3주 과정)
- **시간**: 매주 월, 수, 금 10:00-17:00
- **장소**: 한국미래인재교육협회 교육장

## 교육 내용
1. 늘봄방과후 정책 이해
2. 아동 발달 심리 및 지도법
3. 교육 프로그램 개발 실습
4. 현장 실습 및 멘토링

## 수강료 및 혜택
- **정상가**: 450,000원
- **조기 신청 할인**: 380,000원 (12월 20일까지)
- **수료 시 자격증 발급**
- **우수 수료자 강사 채용 연계**

## 신청 방법
- 구글폼 신청: https://forms.gle/example
- 네이버 블로그: https://blog.naver.com/aw_yumic/224194292359
- 문의: 010-3450-1117

## 모집 인원
선착순 30명 (마감 임박!)

많은 관심과 참여 부탁드립니다.',
  1,
  0,
  '2025-12-08 00:00:00',
  0
);
```

**공지사항 3번:**
```sql
INSERT OR IGNORE INTO notices (id, title, content, is_published, is_popup, created_at, views)
VALUES (
  3,
  '2026학년도 대입 AI 면접 대비 특강 개최',
  '# 2026학년도 대입 AI 면접 대비 특강 개최

## 특강 안내
인공지능(AI) 면접이 대입 전형의 핵심 요소로 자리잡고 있습니다. 
한국미래인재교육협회에서 AI 면접 완벽 대비 특강을 개최합니다.

## 일정 및 장소
- **일시**: 2025년 12월 14일(토) 14:00-18:00
- **장소**: 온라인 실시간 강의 (ZOOM)
- **대상**: 2026학년도 대입 준비생 및 학부모

## 강의 내용
1. **AI 면접 시스템 이해**
   - AI 면접 평가 기준 분석
   - 주요 대학별 AI 면접 유형
   
2. **실전 대응 전략**
   - 효과적인 답변 구성법
   - 비언어적 표현 관리
   - 긴장 관리 및 마인드 컨트롤

3. **모의 면접 실습**
   - 실제 AI 시스템을 활용한 모의 면접
   - 1:1 피드백 제공
   - Q&A 세션

## 특강 비용
- **수강료**: 50,000원
- **재원생 할인**: 35,000원
- **교재 및 실습 자료 제공**

## 강사 소개
김미래 교수 (서울대학교 교육학 박사)
- 대입 면접 전문가
- AI 교육 컨설턴트
- 다수 대학 입학사정관 경력

## 신청 및 문의
- 구글폼: https://forms.gle/example2
- 전화: 010-3450-1117
- 이메일: info@kfea.ai.kr

**선착순 50명 한정! 지금 바로 신청하세요!**',
  1,
  0,
  '2025-12-05 00:00:00',
  0
);
```

**공지사항 4번:**
```sql
INSERT OR IGNORE INTO notices (id, title, content, is_published, is_popup, created_at, views)
VALUES (
  4,
  '온라인 강의실 시스템 업그레이드 완료',
  '# 온라인 강의실 시스템 업그레이드 완료

## 업그레이드 안내
한국미래인재교육협회 온라인 강의실 시스템이 전면 업그레이드되었습니다.

## 주요 변경 사항

### 1. 새로운 사용자 인터페이스
- 직관적이고 현대적인 디자인
- 모바일 최적화 완료
- 다크 모드 지원

### 2. 향상된 영상 품질
- 최대 4K 해상도 지원
- 적응형 스트리밍 기술 적용
- 낮은 네트워크 환경에서도 안정적 시청

### 3. 새로운 학습 관리 기능
- 학습 진도 자동 저장
- 북마크 기능 추가
- 학습 노트 작성 기능
- 퀴즈 및 과제 제출 시스템

### 4. 실시간 소통 강화
- 강사-학생 채팅 기능
- 실시간 질의응답 시스템
- 화상 상담 예약 기능
- 학습 커뮤니티 오픈

### 5. 보안 강화
- 2단계 인증 도입
- 개인정보 보호 강화
- 안전한 결제 시스템

## 사용 방법
1. 기존 계정으로 자동 전환됩니다
2. 첫 로그인 시 간단한 튜토리얼 제공
3. 사용 가이드: https://kfea.ai.kr/guide

## 모바일 앱 출시 예정
- **iOS/Android 앱 2026년 1월 출시 예정**
- 언제 어디서나 학습 가능
- 푸시 알림으로 일정 관리

## 기술 지원
- 평일 09:00-18:00
- 전화: 010-3450-1117
- 이메일: support@kfea.ai.kr
- 카카오톡: @한국미래인재교육협회

더 나은 학습 환경을 제공하기 위해 최선을 다하겠습니다.
감사합니다.

**한국미래인재교육협회 드림**',
  1,
  0,
  '2025-12-01 00:00:00',
  0
);
```

---

#### ⑧ 최종 확인
```sql
SELECT id, title, is_published, is_popup, LENGTH(content) as content_length, created_at FROM notices ORDER BY created_at DESC;
```
**예상 결과**: 4개 공지사항 목록 (ID 1, 2, 3, 4)

```sql
SELECT id, username, name, role, is_active FROM admins;
```
**예상 결과**: admin 계정 1개

---

### 3단계: 관리자 모드 테스트

#### ① 로그인
- **URL**: https://kfea.ai.kr/admin/login
- **ID**: `admin`
- **비밀번호**: `kfea2026!@`

#### ② 대시보드 확인
- 로그인 후 자동으로 대시보드로 이동
- 통계 정보 표시 확인:
  - 활동소식: 31건
  - 공지사항: 4건 (수정됨)
  - 자료실: 0건
  - 회원: 0명

#### ③ 공지사항 관리
- 좌측 메뉴에서 "공지사항 관리" 클릭
- **4개 공지사항** 표시 확인:
  1. 늘봄+제로웨이스트 강사 자격증 특강 (팝업 배지)
  2. 2025년 겨울방학 늘봄방과후 전문강사 특별과정 모집
  3. 2026학년도 대입 AI 면접 대비 특강 개최
  4. 온라인 강의실 시스템 업그레이드 완료

#### ④ 공지사항 작성/수정 테스트
- "새 공지사항 추가" 버튼 클릭
- 제목/내용 입력
- 팝업 체크박스 테스트
- 저장 버튼 클릭

---

### 4단계: 사용자 화면 확인

#### ① 메인 페이지
- **URL**: https://kfea.ai.kr
- **팝업 공지사항** 표시 확인 (ID 1번)
- "오늘 하루 보지 않기" 체크박스 작동 확인
- **공지사항 섹션**: 최신 3개 공지사항 표시

#### ② 공지사항 게시판
- **URL**: https://kfea.ai.kr/boards/notice
- **4개 공지사항** 목록 표시
- 각 공지사항 클릭 → 상세 페이지 이동

#### ③ 공지사항 상세 페이지
- **URL**: https://kfea.ai.kr/boards/notice/1 (ID 1~4)
- 제목, 내용, 작성일, 조회수 표시
- Markdown 형식 렌더링
- 목록 버튼으로 돌아가기

---

## 📋 체크리스트

- [ ] Cloudflare D1 Console 접속
- [ ] admins 테이블 생성 확인
- [ ] notices 테이블 생성 확인
- [ ] admin 계정 삽입 (ID: admin, PW: kfea2026!@)
- [ ] 공지사항 4개 삽입 (ID 1, 2, 3, 4)
- [ ] SELECT 쿼리로 데이터 확인 (4개 공지사항)
- [ ] 관리자 로그인 테스트 (https://kfea.ai.kr/admin/login)
- [ ] 관리자 대시보드 확인
- [ ] 공지사항 관리 페이지 접속
- [ ] 공지사항 4개 목록 표시 확인
- [ ] 메인 페이지 팝업 공지사항 확인
- [ ] 공지사항 게시판 4개 목록 확인
- [ ] 공지사항 상세 페이지 확인 (ID 1~4)

---

## 🎯 완료 후 결과

### 관리자 모드
- ✅ 로그인 정상 작동 (admin / kfea2026!@)
- ✅ 대시보드 통계 표시
- ✅ 공지사항 관리 페이지 정상 작동
- ✅ 공지사항 추가/수정/삭제 기능
- ✅ 활동소식 관리 정상 작동

### 사용자 화면
- ✅ 메인 페이지 팝업 공지사항
- ✅ 메인 페이지 공지사항 목록 (최신 3개)
- ✅ 공지사항 게시판 (전체 4개)
- ✅ 공지사항 상세 페이지 (ID 1~4)

---

## 🚨 문제 해결

### 문제 1: 로그인 시 "아이디 또는 비밀번호가 올바르지 않습니다" 오류
**원인**: admins 테이블에 admin 계정이 없음
**해결**: 위 4단계의 ④번 SQL 실행

### 문제 2: 공지사항 관리 페이지에서 "등록된 공지사항이 없습니다" 표시
**원인**: notices 테이블에 데이터가 없음
**해결**: 위 4단계의 ⑦번 SQL 실행 (4개 공지사항 삽입)

### 문제 3: 공지사항 API 401 오류
**원인**: JWT 토큰이 만료되었거나 유효하지 않음
**해결**: 다시 로그인하여 새 토큰 발급

### 문제 4: Cloudflare D1 Console에서 SQL 실행 실패
**원인**: 여러 줄 SQL을 한 번에 실행
**해결**: 각 SQL을 하나씩 순서대로 실행

---

## 📝 추가 정보

### 파일 위치
- **전체 SQL 스크립트**: `/home/user/kfea/PRODUCTION_DB_FIX.sql`
- **이 가이드 문서**: `/home/user/kfea/ADMIN_FIX_GUIDE.md`

### API 엔드포인트
- **로그인**: `POST /admin/api/login`
- **공지사항 목록**: `GET /admin/api/notices` (인증 필요)
- **공지사항 추가**: `POST /admin/api/notices` (인증 필요)
- **공지사항 수정**: `PUT /admin/api/notices/:id` (인증 필요)
- **공지사항 삭제**: `DELETE /admin/api/notices/:id` (인증 필요)

### 로컬 테스트
```bash
# 로컬 서버 시작
cd /home/user/kfea && pm2 restart kfea

# 로컬 URL
http://localhost:3000/admin/login
http://localhost:3000/admin/dashboard
http://localhost:3000/admin/notices
```

---

**작업 완료 후 이 문서를 참고하여 모든 기능이 정상 작동하는지 확인하세요!**
