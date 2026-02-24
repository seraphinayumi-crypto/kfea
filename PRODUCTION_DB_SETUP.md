# 프로덕션 D1 데이터베이스 설정 가이드

## 📊 현재 상황
- ✅ 로컬 D1 데이터베이스: 31개 기사 데이터 완료
- ❌ 프로덕션 D1 데이터베이스: 비어있음 (API 권한 문제)

## 🎯 해결 방법: Cloudflare 대시보드에서 직접 실행

### 1️⃣ Cloudflare 대시보드 접속
```
https://dash.cloudflare.com/27cefc8323900e7506870d222bed0ab8/workers-and-pages/d1
```

### 2️⃣ D1 데이터베이스 선택
- **데이터베이스 이름**: `kfea-production`
- **Database ID**: `81a7641d-edc4-47a1-bc45-8c39257556ba`

### 3️⃣ Console 탭으로 이동
좌측 메뉴에서 **"Console"** 클릭

### 4️⃣ 마이그레이션 실행
아래 순서대로 SQL을 복사해서 실행:

#### Step 1: 테이블 생성 (0001_initial_schema.sql)
```sql
-- 파일 경로: /home/user/kfea/migrations/0001_initial_schema.sql
```

#### Step 2: 관리자 필드 추가 (0002_add_admin_fields.sql)
```sql
-- 파일 경로: /home/user/kfea/migrations/0002_add_admin_fields.sql
```

#### Step 3: 시드 데이터 추가 (seed.sql)
```sql
-- 파일 경로: /home/user/kfea/seed.sql
```

### 5️⃣ 확인
```sql
SELECT COUNT(*) as count FROM articles;
-- 결과: 31개
```

## 🚀 완료 후
1. https://kfea.ai.kr/rss.xml 접속해서 기사 31개 확인
2. 네이버 서치어드바이저에 RSS 제출

---

## 📝 참고
- 마이그레이션 파일: `/home/user/kfea/migrations/`
- 시드 데이터 파일: `/home/user/kfea/seed.sql`
- RSS 엔드포인트: https://kfea.ai.kr/rss.xml

