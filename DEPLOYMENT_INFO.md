# 한국미래인재교육협회 배포 정보

## 📅 최종 업데이트: 2026-01-09

## 🌐 배포 URL
- **프로덕션**: https://kfea.ai.kr
- **최신 배포**: https://b26af585.kfea.pages.dev
- **GitHub**: https://github.com/seraphinayumi-crypto/kfea

## 📦 백업 정보
- **백업 파일**: kfea_complete_backup_2026-01-09.tar.gz
- **다운로드 URL**: https://www.genspark.ai/api/files/s/m3as4lFA
- **백업 크기**: 136 KB
- **백업 내용**: 모든 페이지 구현, 대전지부 주소 및 Instagram 링크 업데이트 완료

## 🔄 복원 방법
```bash
# 1. 백업 파일 다운로드
wget https://www.genspark.ai/api/files/s/m3as4lFA -O kfea_backup.tar.gz

# 2. 압축 해제
tar -xzf kfea_backup.tar.gz

# 3. 또는 GitHub에서 클론
git clone https://github.com/seraphinayumi-crypto/kfea.git
cd kfea

# 4. 의존성 설치
npm install

# 5. 빌드
npm run build

# 6. 로컬 테스트
pm2 start ecosystem.config.cjs

# 7. Cloudflare 배포
npx wrangler pages deploy dist --project-name kfea
```

## 📋 구현된 페이지
✅ `/` - 홈페이지 (32개 협력기관)
✅ `/about` - 협회 개요
✅ `/president` - 대표 인사말 (대구대/광운대 석사)
✅ `/organization` - 조직도 (서울 본부 전문위원 4명, 대구지부, 대전지부)
✅ `/programs` - 교육과정 (4개 프로그램)
✅ `/activities` - 활동 소식
✅ `/contact` - 문의하기

## 📞 연락처
- **전화**: 0507-1426-1547
- **이메일**: info@kfea.ai.kr
- **주소**: 서울특별시 강남구 논현로10길 30 505-62호
- **대전지부**: 대전광역시 천동로 686

## 🔗 소셜 미디어
- **네이버 블로그**: https://blog.naver.com/aw_yumic
- **YouTube**: https://www.youtube.com/@KFEA
- **Instagram**: https://www.instagram.com/edu_awesome.wave/

## 🛠️ 기술 스택
- **프레임워크**: Hono (Cloudflare Workers)
- **배포**: Cloudflare Pages
- **스타일**: Tailwind CSS + Custom CSS
- **아이콘**: Font Awesome

## 📝 최근 변경사항
- 대전지부 주소 추가: 대전광역시 천동로 686
- Instagram 링크 업데이트: edu_awesome.wave
- 모든 페이지 완전 구현
- 조직도에 서울 본부 전문위원 4명 추가
- 대표 학력 정보 추가 (대구대/광운대 석사)

## 🔐 환경 변수
- Cloudflare Pages에서 관리
- 로컬 개발: `.dev.vars` 파일 사용
