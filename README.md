# 한국미래인재교육협회 (KFEA) 웹사이트

## 📋 프로젝트 개요

한국미래인재교육협회의 공식 웹사이트입니다. Cloudflare Pages와 Workers를 기반으로 구축된 현대적인 웹 애플리케이션입니다.

- **프로덕션 URL**: https://kfea.ai.kr
- **GitHub**: https://github.com/seraphinayumi-crypto/kfea
- **기술 스택**: Hono + TypeScript + TailwindCSS + Cloudflare Workers + D1

## 🚀 주요 기능

### 공개 페이지
- ✅ 협회 소개 (개요, 대표 인사말, 조직도)
- ✅ 교육 프로그램 안내
- ✅ 민간자격증 과정 소개
- ✅ 활동소식 (31건, D1 데이터베이스 연동)
- ✅ 지부 안내 (서울 본부, 대구/대전 지역본부)
- ✅ 공지사항 및 게시판
- ✅ 문의하기

### 관리자 시스템 (D1 데이터베이스 연동)
- ✅ JWT 기반 인증 시스템
- ✅ 관리자 로그인 (`/admin/login`)
- ✅ 대시보드 (`/admin/dashboard`)
- ✅ 활동소식 관리 (CRUD)
  - 기사 추가/수정/삭제
  - 실시간 목록 조회
  - 날짜별 정렬

## 💻 로컬 개발 환경 설정

### 1. 저장소 클론 및 의존성 설치

```bash
git clone https://github.com/seraphinayumi-crypto/kfea.git
cd kfea
npm install
```

### 2. D1 데이터베이스 설정 (로컬)

```bash
# D1 마이그레이션 적용 (로컬 개발용)
npm run db:migrate:local

# 시드 데이터 삽입 (31건의 활동소식 기사 + 관리자 계정)
npm run db:seed
```

### 3. 개발 서버 실행

```bash
# 빌드
npm run build

# PM2로 개발 서버 시작 (포트 3000)
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:d1
```

### 4. 관리자 로그인

- **URL**: http://localhost:3000/admin/login
- **아이디**: `admin`
- **비밀번호**: `kfea2026!@`

## 🔧 주요 NPM 스크립트

```bash
# 개발
npm run dev                    # Vite 개발 서버
npm run dev:sandbox            # Wrangler 개발 서버 (기본)
npm run dev:d1                 # Wrangler + D1 로컬 데이터베이스

# 빌드 & 배포
npm run build                  # 프로덕션 빌드
npm run deploy                 # Cloudflare Pages 배포
npm run deploy:prod            # 프로덕션 배포 (프로젝트명 지정)

# 데이터베이스
npm run db:migrate:local       # 로컬 D1 마이그레이션 적용
npm run db:migrate:prod        # 프로덕션 D1 마이그레이션 적용
npm run db:seed                # 시드 데이터 삽입
npm run db:reset               # 로컬 DB 초기화 및 재생성
npm run db:console:local       # 로컬 D1 콘솔
npm run db:console:prod        # 프로덕션 D1 콘솔

# 유틸리티
npm run clean-port             # 포트 3000 정리
npm run test                   # 로컬 서버 테스트
npm run cf-typegen             # Cloudflare 타입 생성
```

## 🗄️ 데이터베이스 구조

### articles (활동소식)
```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  source TEXT DEFAULT '한국강사신문',
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER
);
```

### admins (관리자)
```sql
CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'admin',
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 프로덕션 D1 데이터베이스 설정

현재 프로덕션에서는 D1 데이터베이스가 설정되지 않아 **관리자 기능이 비활성화**되어 있습니다.

### 설정 방법

#### 1. Cloudflare Dashboard에서 D1 생성

1. [Cloudflare Dashboard](https://dash.cloudflare.com) 로그인
2. 좌측 메뉴에서 **Workers & Pages** 클릭
3. 상단 탭에서 **D1 SQL Database** 클릭
4. **Create database** 클릭
5. 데이터베이스 이름: `kfea-production`
6. 생성 후 **Database ID** 복사

#### 2. wrangler.jsonc 수정

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "kfea",
  "compatibility_date": "2025-12-23",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  
  // 아래 주석 해제하고 database_id를 실제 ID로 교체
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "kfea-production",
      "database_id": "여기에-복사한-Database-ID-입력"
    }
  ]
}
```

#### 3. 마이그레이션 적용

```bash
# 프로덕션 데이터베이스에 스키마 적용
npm run db:migrate:prod

# 시드 데이터 삽입 (활동소식 31건 + 관리자 계정)
npx wrangler d1 execute kfea-production --remote --file=./seed.sql
```

#### 4. 재배포

```bash
npm run build
npm run deploy:prod
```

#### 5. 확인

https://kfea.ai.kr/admin/login 에서 관리자 로그인 테스트

## 📊 관리자 API 엔드포인트

### 인증
- `POST /admin/api/login` - 로그인 (JWT 토큰 발급)

### 활동소식 관리
- `GET /admin/api/activities` - 목록 조회 (인증 필요)
- `POST /admin/api/activities` - 새 기사 추가 (인증 필요)
- `PUT /admin/api/activities/:id` - 기사 수정 (인증 필요)
- `DELETE /admin/api/activities/:id` - 기사 삭제 (인증 필요)

### API 사용 예시

```bash
# 로그인
TOKEN=$(curl -s -X POST http://localhost:3000/admin/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"kfea2026!@"}' \
  | jq -r '.token')

# 활동소식 목록 조회
curl http://localhost:3000/admin/api/activities \
  -H "Authorization: Bearer $TOKEN"

# 새 기사 추가
curl -X POST http://localhost:3000/admin/api/activities \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-01-27",
    "title": "새로운 기사 제목",
    "idxno": "195600"
  }'
```

## 🔒 보안

- JWT 토큰 기반 인증 (HS256)
- 비밀번호는 평문 저장 (프로덕션에서는 해시 필요)
- JWT Secret은 환경변수로 관리 권장
- CORS 설정으로 API 보호

## 🛠️ 프로젝트 구조

```
webapp/
├── src/
│   └── index.tsx              # 메인 애플리케이션 (Hono)
├── public/
│   └── static/                # 정적 파일
├── migrations/
│   ├── 0001_initial_schema.sql
│   └── 0002_add_admin_fields.sql
├── seed.sql                   # 시드 데이터
├── ecosystem.config.cjs       # PM2 설정
├── wrangler.jsonc            # Cloudflare 설정
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 데이터 현황

- **활동소식**: 31건
  - 한국미래인재교육협회: 14건
  - 최유미 대표: 11건
  - 한국면접관협회: 9건
  - 강은지 이사: 6건
  - 교육정책: 4건
- **관리자 계정**: 1개 (`admin`)
- **공지사항**: 3건 (하드코딩)

## 🐛 트러블슈팅

### D1 관련 오류

**오류**: `Error 8000022: Invalid database UUID (local-dev-only)`
**해결**: 프로덕션 배포 시 wrangler.jsonc에서 실제 database_id 설정 필요

**오류**: `no such column: is_active`
**해결**: 마이그레이션 0002_add_admin_fields.sql 적용
```bash
npm run db:migrate:local
```

### JWT 검증 오류

**오류**: `유효하지 않은 토큰입니다`
**해결**: sign/verify 함수에 알고리즘 명시 (`'HS256'`)

## 📞 문의

- **협회 전화**: 0507-1426-1547
- **이메일**: info@kfea.ai.kr
- **주소**: 서울특별시 강남구 논현로10길 30 505-62호

## 📄 라이선스

© 2024-2026 한국미래인재교육협회. All rights reserved.
