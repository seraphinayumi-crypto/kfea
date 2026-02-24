import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

// D1 타입 정의
type Bindings = {
  DB: D1Database
}

// JWT Secret (실제 배포시에는 환경변수로 관리)
const JWT_SECRET = 'kfea-secret-2026-change-in-production'

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정 (관리자 API용)
app.use('/admin/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Layout Component
const Layout = (props: { children: any; title?: string }) => {
  const title = props.title || '한국미래인재교육협회'
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content="한국미래인재교육협회 - 늘봄방과후, AI 활용 교육, 취업 지원, 강사 양성 등 미래를 준비하는 인재양성을 위한 전문 교육 프로그램과 서비스를 제공합니다." />
        <meta name="keywords" content="한국미래인재교육협회, 늘봄방과후, 방과후강사, AI교육, 취업지원, 강사양성, 교육협회, 인재양성, 전문교육, 자격증" />
        <meta name="author" content="한국미래인재교육협회" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="ko" />
        <meta name="revisit-after" content="1 days" />
        
        {/* Open Graph */}
        <meta property="og:title" content="한국미래인재교육협회" />
        <meta property="og:description" content="한국미래인재교육협회 - 늘봄방과후, AI 활용 교육, 취업 지원, 강사 양성 등 미래를 준비하는 인재양성을 위한 전문 교육 프로그램과 서비스를 제공합니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kfea.ai.kr" />
        <meta property="og:site_name" content="한국미래인재교육협회" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="한국미래인재교육협회" />
        <meta name="twitter:description" content="한국미래인재교육협회 - 늘봄방과후, AI 활용 교육, 취업 지원, 강사 양성 등 미래를 준비하는 인재양성을 위한 전문 교육 프로그램과 서비스를 제공합니다." />
        
        {/* Verification */}
        <meta name="naver-site-verification" content="naver8d07a9dde26de297a5ca2c99033df705.html" />
        <meta name="google-site-verification" content="" />
        
        {/* Other */}
        <link rel="canonical" href="https://kfea.ai.kr" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1e40af" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "한국미래인재교육협회",
            "alternateName": ["KFEA", "Korea Future Education Academy"],
            "url": "https://kfea.ai.kr",
            "logo": "https://kfea.ai.kr/static/logo.png",
            "description": "미래를 준비하는 인재양성을 위한 전문 교육기관",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "논현로10길 30 505-62호",
              "addressLocality": "강남구",
              "addressRegion": "서울특별시",
              "postalCode": "06292",
              "addressCountry": "KR"
            },
            "telephone": "0507-1426-1547",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "0507-1426-1547",
              "contactType": "customer service",
              "areaServed": "KR",
              "availableLanguage": "Korean"
            }],
            "sameAs": [
              "https://blog.naver.com/aw_yumic",
              "https://www.youtube.com/@KFEA",
              "https://new.smartplace.naver.com/bizes/place/11179366"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "교육 프로그램",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "늘봄방과후 전문강사 양성",
                    "description": "초등학교 방과후 전문 강사 양성과정"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI 활용 교육",
                    "description": "자기소개서, 면접, 교안 제작 등 AI 도구 활용 실무 교육"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "취업 지원 프로그램",
                    "description": "PSAT, NCS, GSAT 시험 대비 및 공기업 취업 완전 정복"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "강사 양성 과정",
                    "description": "초보자부터 전문가까지 체계적인 강사 코칭 프로그램"
                  }
                }
              ]
            }
          })}
        </script>
        
        {/* External CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <link href="/static/modern-styles.css" rel="stylesheet" />
        <link href="/static/dropdown-fix.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#1e40af',
                    secondary: '#3b82f6',
                    accent: '#f59e0b'
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="min-h-[400px] bg-gray-50">
        <div>
          {/* Header with improved navigation spacing */}
          <header class="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center h-20">
                {/* Logo */}
                <div class="flex items-center">
                  <a href="/" class="flex items-center space-x-3 group">
                    <img 
                      src="https://www.genspark.ai/api/files/s/Jier95KY" 
                      alt="한국미래인재교육협회 로고" 
                      class="h-12 w-auto object-contain"
                    />
                    <div>
                      <div class="text-base font-bold text-gray-900 whitespace-nowrap">한국미래인재교육협회</div>
                      <div class="text-xs text-gray-500 whitespace-nowrap">Korea Future Education Association</div>
                    </div>
                  </a>
                </div>

                {/* Desktop Navigation - IMPROVED SPACING */}
                <nav class="hidden lg:flex items-center space-x-3">
                  <a href="/" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-blue-900 text-white whitespace-nowrap">
                    홈
                  </a>
                  
                  {/* 협회소개 Dropdown */}
                  <div class="relative group">
                    <button class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                      협회소개
                    </button>
                    <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border border-gray-200">
                      <a href="/about" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 mx-2">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <i class="fas fa-info-circle text-blue-600"></i>
                        </div>
                        <span class="font-medium">협회 개요</span>
                      </a>
                      <a href="/president" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 mx-2">
                        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <i class="fas fa-user-tie text-green-600"></i>
                        </div>
                        <span class="font-medium">대표 인사말</span>
                      </a>
                      <a href="/organization" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 mx-2">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <i class="fas fa-sitemap text-blue-700"></i>
                        </div>
                        <span class="font-medium">조직도</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* 교육과정 Dropdown */}
                  <div class="relative group">
                    <button class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                      교육과정
                    </button>
                    <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border border-gray-200">
                      <a href="/programs" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 mx-2">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <i class="fas fa-book-open text-blue-600"></i>
                        </div>
                        <span class="font-medium">기본 교육과정</span>
                      </a>
                      <a href="/programs/certifications" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 mx-2">
                        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <i class="fas fa-certificate text-green-600"></i>
                        </div>
                        <span class="font-medium">자격증 과정</span>
                      </a>
                    </div>
                  </div>
                  
                  <a href="/activities" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                    활동소식
                  </a>
                  
                  {/* 지부안내 Dropdown */}
                  <div class="relative group">
                    <button class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                      지부안내
                    </button>
                    <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border border-gray-200">
                      <a href="/seoul-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>서울 본부
                      </a>
                      <a href="/daegu-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>대구 지역본부
                      </a>
                      <a href="/daejeon-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>대전 지역본부
                      </a>
                    </div>
                  </div>
                  
                  {/* 게시판 Dropdown */}
                  <div class="relative group">
                    <button class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                      게시판
                    </button>
                    <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border border-gray-200">
                      <a href="/boards/notice" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-bullhorn mr-2 text-blue-700"></i>공지사항
                      </a>
                      <a href="/boards/resources" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-folder-open mr-2 text-blue-700"></i>자료실
                      </a>
                      <a href="/boards/qna" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-question-circle mr-2 text-blue-700"></i>Q&A
                      </a>
                      <a href="/boards/gallery" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-images mr-2 text-blue-700"></i>갤러리
                      </a>
                    </div>
                  </div>
                  
                  <a href="/classroom" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                    강의실
                  </a>
                  
                  {/* 로그인 Dropdown */}
                  <div class="relative group" id="login-menu">
                    <button class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100 whitespace-nowrap" id="login-button">
                      로그인
                    </button>
                    <div class="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border" id="login-dropdown">
                      {/* Dynamic content */}
                    </div>
                  </div>
                  
                  <a href="/contact" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                    문의하기
                  </a>
                </nav>

                {/* Mobile menu button */}
                <div class="lg:hidden">
                  <button id="mobile-menu-button" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <i class="fas fa-bars text-xl text-gray-700"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-200">
              <div class="px-4 py-4 space-y-2">
                <a href="/" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                  <i class="fas fa-home mr-2"></i>홈
                </a>
                
                <div class="border-t pt-2">
                  <div class="px-4 py-2 text-sm font-semibold text-gray-500">협회소개</div>
                  <a href="/about" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-info-circle mr-2"></i>협회 개요
                  </a>
                  <a href="/president" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-user-tie mr-2"></i>대표 인사말
                  </a>
                  <a href="/organization" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-sitemap mr-2"></i>조직도
                  </a>
                </div>

                <div class="border-t pt-2">
                  <div class="px-4 py-2 text-sm font-semibold text-gray-500">교육과정</div>
                  <a href="/programs" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-book-open mr-2"></i>기본 교육과정
                  </a>
                  <a href="/programs/certifications" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-certificate mr-2"></i>자격증 과정
                  </a>
                </div>

                <div class="border-t pt-2">
                  <a href="/activities" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    <i class="fas fa-calendar-alt mr-2"></i>활동 소식
                  </a>
                </div>

                <div class="border-t pt-2">
                  <div class="px-4 py-2 text-sm font-semibold text-gray-500">지부안내</div>
                  <a href="/seoul-branch" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>서울 본부
                  </a>
                  <a href="/daegu-branch" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>대구 지역본부
                  </a>
                  <a href="/daejeon-branch" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>대전 지역본부
                  </a>
                </div>

                <div class="border-t pt-2">
                  <div class="px-4 py-2 text-sm font-semibold text-gray-500">게시판</div>
                  <a href="/boards/notice" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-bullhorn mr-2"></i>공지사항
                  </a>
                  <a href="/boards/resources" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-folder-open mr-2"></i>자료실
                  </a>
                  <a href="/boards/qna" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-question-circle mr-2"></i>Q&A
                  </a>
                  <a href="/boards/gallery" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-images mr-2"></i>갤러리
                  </a>
                </div>

                <div class="border-t pt-2">
                  <a href="/classroom" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    <i class="fas fa-chalkboard-teacher mr-2"></i>강의실
                  </a>
                  <a href="/login" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    <i class="fas fa-sign-in-alt mr-2"></i>로그인
                  </a>
                  <a href="/contact" class="block px-4 py-3 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold">
                    <i class="fas fa-envelope mr-2"></i>문의하기
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main>{props.children}</main>
          
          {/* Footer */}
          <footer class="bg-gray-900 text-white py-8"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="grid md:grid-cols-3 gap-6">
                {/* 협회 정보 */}
                <div>
                  <h3 class="text-xl font-bold mb-4">한국미래인재교육협회</h3>
                  <p class="text-gray-400 mb-4">
                    미래를 준비하는 인재양성을 위한<br />
                    전문 교육기관
                  </p>
                  <div class="space-y-2">
                    <p class="text-sm text-gray-400">
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      서울 강남구 논현로10길 30 505-62호
                    </p>
                    <p class="text-sm text-gray-400">
                      <i class="fas fa-phone mr-2"></i>
                      0507-1426-1547
                    </p>
                    <p class="text-sm text-gray-400">
                      <i class="fas fa-envelope mr-2"></i>
                      info@kfea.ai.kr
                    </p>
                  </div>
                </div>

                {/* 빠른 링크 */}
                <div>
                  <h3 class="text-lg font-bold mb-4">빠른 링크</h3>
                  <div class="space-y-2">
                    <a href="/about" class="block text-gray-400 hover:text-white transition-colors">협회 소개</a>
                    <a href="/programs" class="block text-gray-400 hover:text-white transition-colors">교육 프로그램</a>
                    <a href="/activities" class="block text-gray-400 hover:text-white transition-colors">활동소식</a>
                    <a href="/contact" class="block text-gray-400 hover:text-white transition-colors">문의하기</a>
                  </div>
                </div>

                {/* SNS */}
                <div>
                  <h3 class="text-lg font-bold mb-4">소셜 미디어</h3>
                  <div class="flex space-x-4">
                    <a href="https://blog.naver.com/aw_yumic" target="_blank" rel="noopener noreferrer" 
                       class="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                      <i class="fas fa-blog text-lg"></i>
                    </a>
                    <a href="https://www.youtube.com/@KFEA" target="_blank" rel="noopener noreferrer"
                       class="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors">
                      <i class="fab fa-youtube text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2025 한국미래인재교육협회. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>

        {/* Scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
        // 모바일 메뉴 토글
        document.addEventListener('DOMContentLoaded', function() {
          const mobileMenuButton = document.getElementById('mobile-menu-button');
          const mobileMenu = document.getElementById('mobile-menu');
          
          if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
              mobileMenu.classList.toggle('hidden');
              const icon = mobileMenuButton.querySelector('i');
              if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
              } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
              }
            });
          }
        });
        
        // 로그아웃 함수
        function logout() {
          localStorage.removeItem('adminToken');
          fetch('/api/admin/logout', { method: 'POST' })
            .then(() => {
              window.location.href = '/';
            });
        }
        
        // 로그인 메뉴 동적 생성 함수
        function updateLoginMenu() {
          const adminToken = localStorage.getItem('adminToken');
          const dropdown = document.getElementById('login-dropdown');
          const button = document.getElementById('login-button');
          
          if (!dropdown) return;
          
          if (adminToken) {
            // 관리자 로그인 상태: 관리 메뉴 표시
            if (button) {
              button.innerHTML = '관리자 <i class="fas fa-chevron-down text-xs ml-1"></i>';
            }
            dropdown.innerHTML = \`
              <a href="/admin/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-tachometer-alt mr-2 text-blue-500"></i>관리자 대시보드
              </a>
              <div class="border-t border-gray-200 my-1"></div>
              <div class="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">관리 시스템</div>
              <a href="/admin/certificates" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-certificate mr-2 text-blue-500"></i>자격증 발급 관리
              </a>
              <a href="/admin/members" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-users mr-2 text-green-500"></i>정회원 관리
              </a>
              <a href="/admin/reports" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-chart-bar mr-2 text-purple-500"></i>통계 및 보고서
              </a>
              <div class="border-t border-gray-200 my-1"></div>
              <div class="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">신청자 관리</div>
              <a href="/admin/instructor-applications" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-chalkboard-teacher mr-2 text-yellow-500"></i>강사 신청자
              </a>
              <a href="/admin/student-applications" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-user-graduate mr-2 text-cyan-500"></i>학습자 신청자
              </a>
              <div class="border-t border-gray-200 my-1"></div>
              <div class="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">기존 시스템</div>
              <a href="/admin/classroom" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-chalkboard mr-2 text-indigo-500"></i>강의실 관리
              </a>
              <div class="border-t border-gray-200 my-1"></div>
              <button onclick="logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <i class="fas fa-sign-out-alt mr-2 text-red-500"></i>로그아웃
              </button>
            \`;
          } else {
            // 로그인 안 된 상태: 로그인/회원가입만 표시
            if (button) {
              button.innerHTML = '로그인 <i class="fas fa-chevron-down text-xs ml-1"></i>';
            }
            dropdown.innerHTML = \`
              <a href="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-sign-in-alt mr-2 text-blue-500"></i>로그인
              </a>
              <a href="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-user-plus mr-2 text-green-500"></i>회원가입
              </a>
              <div class="border-t border-gray-200 my-1"></div>
              <a href="/admin/login" class="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-100">
                <i class="fas fa-user-shield mr-2"></i>관리자 로그인
              </a>
            \`;
          }
        }
        
        // 페이지 로드 시 메뉴 업데이트
        document.addEventListener('DOMContentLoaded', function() {
          updateLoginMenu();
        });
        
        // 관리자 페이지 인증 체크
        if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
          const adminToken = localStorage.getItem('adminToken');
          if (!adminToken) {
            window.location.href = '/admin/login';
          }
        }
        
        // 팝업 공지사항 표시
        function showPopupNotice() {
          const today = new Date().toDateString();
          const hideDate = localStorage.getItem('hidePopupDate');
          
          // 오늘 하루 보지 않기가 설정되어 있으면 팝업 표시 안함
          if (hideDate === today) {
            return;
          }
          
          // 서버에서 팝업 공지사항 조회
          fetch('/api/popup-notice')
            .then(response => response.json())
            .then(data => {
              if (data.success && data.notice) {
                const popupHtml = \`
                  <div id="notice-popup" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div class="relative">
                        <!-- 헤더 -->
                        <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
                          <button id="close-popup" class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center transition-all">
                            <i class="fas fa-times text-white text-lg"></i>
                          </button>
                          <div class="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                            특별 할인 이벤트
                          </div>
                          <h2 class="text-xl font-bold pr-8">\${data.notice.title}</h2>
                        </div>
                        
                        <!-- 본문 -->
                        <div class="p-6">
                          <div class="space-y-4 text-sm">
                            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                              <h3 class="font-bold text-green-800 mb-2">📢 과정 안내</h3>
                              <ul class="text-gray-700 space-y-1">
                                <li>• 늘봄방과후 전문강사: 3월 8일(토) 10:00-17:00</li>
                                <li>• 제로웨이스트실천교육강사: 3월 15일(일) 10:00-17:00</li>
                                <li>• ZOOM 온라인 특강</li>
                              </ul>
                            </div>
                            
                            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                              <h3 class="font-bold text-red-800 mb-2">💰 수강료 안내</h3>
                              <ul class="text-gray-700 space-y-1">
                                <li>• 정가: <span class="line-through">280,000원</span></li>
                                <li>• <span class="text-red-600 font-bold">패키지 할인가: 230,000원 (50,000원 할인!)</span></li>
                                <li>• SNS 후기 작성 시 추가 10,000원 환급</li>
                              </ul>
                            </div>
                            
                            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                              <h3 class="font-bold text-blue-800 mb-2">✅ 이런 분께 추천</h3>
                              <ul class="text-gray-700 space-y-1 text-xs">
                                <li>☑ 늘봄학교·방과후에서 환경 수업 강사로 활동하고 싶은 분</li>
                                <li>☑ 자격증은 있는데 실제 수업 콘텐츠가 없어 막막한 분</li>
                                <li>☑ 부업·프리랜서 강사로 활동하려는 직장인·주부</li>
                              </ul>
                            </div>
                            
                            <div class="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
                              <h3 class="font-bold text-gray-800 mb-2">📞 문의</h3>
                              <ul class="text-gray-700 space-y-1 text-xs">
                                <li>전화: 010-3450-1117</li>
                                <li>이메일: info@kfea.ai.kr</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <!-- 푸터 -->
                        <div class="bg-gray-50 px-6 py-4 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border-t">
                          <label class="flex items-center cursor-pointer text-sm">
                            <input type="checkbox" id="hide-today" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2" />
                            <span class="text-gray-600">오늘 하루 보지 않기</span>
                          </label>
                          <a href="/boards/notice/\${data.notice.id}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors text-sm shadow-md">
                            자세히 보기 →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                \`;
                
                document.body.insertAdjacentHTML('beforeend', popupHtml);
                
                // 팝업 닫기 이벤트
                const popup = document.getElementById('notice-popup');
                const closeButton = document.getElementById('close-popup');
                const hideTodayCheckbox = document.getElementById('hide-today');
                
                closeButton.addEventListener('click', function() {
                  if (hideTodayCheckbox.checked) {
                    localStorage.setItem('hidePopupDate', today);
                  }
                  popup.remove();
                });
                
                // 배경 클릭 시 닫기
                popup.addEventListener('click', function(e) {
                  if (e.target === popup) {
                    if (hideTodayCheckbox.checked) {
                      localStorage.setItem('hidePopupDate', today);
                    }
                    popup.remove();
                  }
                });
              }
            })
            .catch(error => console.error('팝업 조회 실패:', error));
        }
        
        // 홈페이지에서만 팝업 표시
        if (window.location.pathname === '/') {
          // DOMContentLoaded 이벤트가 이미 발생했을 수도 있으므로 즉시 실행도 포함
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showPopupNotice);
          } else {
            showPopupNotice();
          }
        }
      `
        }} />
      </body>
    </html>
  )
}

// Home page
app.get('/', (c) => {
  return c.html(
    <Layout>
      {/* Hero Section */}
      <section class="relative min-h-[500px] md:min-h-[450px] overflow-hidden bg-gradient-to-br from-orange-100 via-teal-100 to-blue-100">
        <div class="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://www.genspark.ai/api/files/s/F1FQTlAq?cache_control=3600" 
            alt="한국미래인재교육협회" 
            class="w-full h-full object-cover" loading="eager"
            fetchpriority="high"
          />
        </div>
      </section>

      {/* Programs Section */}
      <section class="py-10 bg-gradient-to-b from-white to-gray-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <div class="inline-block mb-4">
              <span class="bg-blue-100 text-blue-800 px-6 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider">
                Our Programs
              </span>
            </div>
            <h2 class="text-3xl md:text-3xl font-bold text-gray-900 mb-4">교육 프로그램</h2>
            <p class="text-lg text-gray-600">다양한 분야의 전문 교육과정을 만나보세요</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a href="/programs" class="group bg-white rounded-2xl p-10 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-book-open text-white text-3xl"></i>
              </div>
              <h4 class="text-2xl font-bold mb-3 text-gray-900">기본 교육과정</h4>
              <p class="text-gray-600 mb-4">AI 활용, 취업 지원, 강사 양성 등 전문 실무 교육</p>
              <div class="inline-flex items-center text-blue-600 font-semibold">
                <span>자세히 보기</span>
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </a>

            <a href="/programs/certifications" class="group bg-white rounded-2xl p-10 border-2 border-gray-200 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-certificate text-white text-3xl"></i>
              </div>
              <h4 class="text-2xl font-bold mb-3 text-gray-900">자격증 과정</h4>
              <p class="text-gray-600 mb-4">민간자격증 취득 및 전문성 향상 과정</p>
              <div class="inline-flex items-center text-purple-600 font-semibold">
                <span>자세히 보기</span>
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section class="py-12 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-8">
            <div>
              <h2 class="text-3xl md:text-3xl font-bold text-gray-900 mb-2">공지사항</h2>
              <p class="text-gray-600">최신 소식을 확인하세요</p>
            </div>
            <a href="/notice" class="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              <span>전체보기</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="group bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
              <div class="flex items-center mb-4">
                <span class="bg-red-600 text-white px-4 py-1.5 text-xs font-semibold rounded-lg mr-3">중요</span>
                <span class="text-gray-500 text-sm font-medium">2025.12.08</span>
              </div>
              <h4 class="text-xl font-bold mb-3 text-gray-900">2025년 겨울방학 늘봄방과후 전문강사 특별과정 모집</h4>
              <p class="text-gray-600 leading-relaxed">
                2025학년도 신학기 대비 늘봄방과후 전문강사 양성과정을 개설합니다. 조기 신청 시 수강료 할인 혜택을 받으실 수 있습니다.
              </p>
            </div>

            <div class="group bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
              <div class="flex items-center mb-4">
                <span class="bg-slate-600 text-white px-4 py-1.5 text-xs font-semibold rounded-lg mr-3">교육</span>
                <span class="text-gray-500 text-sm font-medium">2025.12.05</span>
              </div>
              <h4 class="text-xl font-bold mb-3 text-gray-900">2026학년도 대입 AI 면접 대비 특강 개최</h4>
              <p class="text-gray-600 leading-relaxed">
                최신 AI 면접 트렌드 분석과 실전 연습을 통해 대입 면접을 완벽하게 준비하세요. 12월 중 매주 토요일 진행됩니다.
              </p>
            </div>

            <div class="group bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
              <div class="flex items-center mb-4">
                <span class="bg-blue-600 text-white px-4 py-1.5 text-xs font-semibold rounded-lg mr-3">신규</span>
                <span class="text-gray-500 text-sm font-medium">2025.12.01</span>
              </div>
              <h4 class="text-xl font-bold mb-3 text-gray-900">온라인 강의실 시스템 업그레이드 완료</h4>
              <p class="text-gray-600 leading-relaxed">
                더욱 편리해진 학습 관리 시스템으로 언제 어디서나 수준 높은 교육을 받으실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Organizations Section - 32 institutions */}
      <section class="py-10 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4">주요 출강 및 협력 기관</h2>
            <p class="text-base text-gray-600">신뢰할 수 있는 기관들과 함께합니다</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center">
            {/* 32 Partner Organizations */}
            {[
              '전북대학교', '경북대학교', '영남대학교', '대구대학교', '계명대학교', '제주대학교',
              '순천대학교', '경남대학교', '경상국립대학교', '한국기술교육대학교', '서원대학교', '순천향대학교',
              '나사렛대학교', '배재대학교', '동양대학교', '경일대학교', '오산대학교', '수성대학교',
              '호산대학교', '계명문화대학교', '대구공업대학교', '영진전문대학교', '영남이공대학교', '순천제일대학교',
              '국립금오공과대학교', '강원도립대학교', '건양사이버대학교', '한국철도공사', '공주정보고등학교',
              '한국호텔관광고등학교', '한국면접관협회', '대전광역시자원봉사센터'
            ].map((org) => (
              <div class="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center h-28 border border-gray-200 hover:border-blue-300">
                <p class="font-bold text-xs text-center text-gray-800 leading-tight">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section class="py-12 bg-blue-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-3xl font-bold mb-4">협회 통계 및 성과</h2>
            <p class="text-xl text-blue-100">숫자로 보는 한국미래인재교육협회</p>
          </div>

          <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold mb-2">32+</div>
              <div class="text-xl text-blue-100">협력 기관</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold mb-2">6</div>
              <div class="text-xl text-blue-100">민간자격증</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold mb-2">100+</div>
              <div class="text-xl text-blue-100">강의 진행</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold mb-2">500+</div>
              <div class="text-xl text-blue-100">수료생</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-3xl font-bold mb-6">지금 시작하세요</h2>
          <p class="text-xl mb-10 text-blue-100">
            한국미래인재교육협회와 함께 미래를 준비하는 전문가가 되어보세요
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/programs" class="bg-white hover:bg-gray-100 text-blue-900 px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-200 shadow-lg">
              교육과정 보기
            </a>
            <a href="/contact" class="bg-transparent hover:bg-white/10 border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-200">
              문의하기
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Contact page with form
app.get('/contact', (c) => {
  return c.html(
    <Layout title="문의하기 - 한국미래인재교육협회">
      <section class="py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center mb-6">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-3">문의하기</h1>
            <p class="text-base text-gray-600">궁금한 점이 있으시면 언제든지 연락주세요</p>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            {/* 연락처 정보 */}
            <div class="bg-white rounded-2xl shadow-xl p-5">
              <h2 class="text-xl font-bold text-gray-900 mb-4">연락처 정보</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-1">대표</h3>
                    <p class="text-gray-600">최유미</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-phone text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-1">전화번호</h3>
                    <p class="text-gray-600">0507-1426-1547</p>
                    <p class="text-sm text-gray-500">평일 09:00 - 18:00</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-envelope text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-1">이메일</h3>
                    <p class="text-gray-600">info@kfea.ai.kr</p>
                    <p class="text-sm text-gray-500">24시간 접수</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-map-marker-alt text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-1">주소</h3>
                    <p class="text-gray-600">서울특별시 강남구 논현로10길 30 505-62호</p>
                  </div>
                </div>

                <div class="pt-6 border-t border-gray-200">
                  <h3 class="text-base font-bold text-gray-900 mb-3">SNS로 연락하기</h3>
                  <div class="flex space-x-3">
                    <a href="https://blog.naver.com/aw_yumic" target="_blank" rel="noopener noreferrer"
                       class="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      <i class="fas fa-blog"></i>
                      <span>블로그</span>
                    </a>
                    <a href="https://www.youtube.com/@KFEA" target="_blank" rel="noopener noreferrer"
                       class="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      <i class="fab fa-youtube"></i>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 문의 양식 */}
            <div class="bg-white rounded-2xl shadow-xl p-5">
              <h2 class="text-xl font-bold text-gray-900 mb-4">온라인 문의</h2>
              <form id="contactForm" class="space-y-2">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input type="text" id="name" name="name" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                  <input type="email" id="email" name="email" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                  <input type="tel" id="phone" name="phone"
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">문의 유형 *</label>
                  <select id="subject" name="subject" required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">선택하세요</option>
                    <option value="교육과정 문의">교육과정 문의</option>
                    <option value="자격증 문의">자격증 문의</option>
                    <option value="강의실 이용">강의실 이용</option>
                    <option value="협력 제안">협력 제안</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">문의 내용 *</label>
                  <textarea id="message" name="message" rows="4" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>

                <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  <i class="fas fa-paper-plane mr-2"></i>
                  문의하기
                </button>

                <div id="formMessage" class="hidden text-center p-3 rounded-lg"></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const form = e.target;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          const messageDiv = document.getElementById('formMessage');
          const submitButton = form.querySelector('button[type="submit"]');
          
          submitButton.disabled = true;
          submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>전송 중...';
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
              messageDiv.className = 'text-center p-3 rounded-lg bg-green-50 text-green-700';
              messageDiv.textContent = '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.';
              form.reset();
            } else {
              throw new Error(result.error || '전송에 실패했습니다.');
            }
          } catch (error) {
            messageDiv.className = 'text-center p-3 rounded-lg bg-red-50 text-red-700';
            messageDiv.textContent = error.message;
          } finally {
            messageDiv.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>문의하기';
            
            setTimeout(() => {
              messageDiv.classList.add('hidden');
            }, 5000);
          }
        });
      `}} />
    </Layout>
  )
})

// Contact API endpoint
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return c.json({ error: '필수 항목을 모두 입력해주세요.' }, 400)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return c.json({ error: '올바른 이메일 형식이 아닙니다.' }, 400)
    }

    console.log('Contact form submission:', { name, email, phone, subject, message })

    return c.json({ 
      success: true, 
      message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ error: '문의 전송 중 오류가 발생했습니다.' }, 500)
  }
})

// About page - 협회 개요
app.get('/about', (c) => {
  return c.html(
    <Layout title="협회 개요 - 한국미래인재교육협회">
      <section class="py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center mb-6">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-3">협회 개요</h1>
            <p class="text-base text-gray-600">미래를 준비하는 인재양성을 위한 전문 교육기관</p>
          </div>

          <div class="space-y-4">
            {/* 설립 목적 */}
            <div class="bg-white rounded-2xl shadow-lg p-4 md:p-5">
              <h2 class="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <i class="fas fa-lightbulb text-amber-500 mr-4"></i>
                설립 목적
              </h2>
              <p class="text-sm text-gray-700 leading-relaxed">
                한국미래인재교육협회는 급변하는 교육 환경과 4차 산업혁명 시대에 대응하여, 
                미래 사회가 요구하는 창의적이고 전문적인 인재 양성을 목표로 설립되었습니다. 
                늘봄방과후 전문강사 양성, AI 활용 교육, 취업 지원 프로그램 등을 통해 
                교육의 질적 향상과 사회적 가치 실현에 기여하고 있습니다.
              </p>
            </div>

            {/* 비전과 미션 */}
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-4 md:p-5 text-white">
                <div class="flex items-center mb-6">
                  <i class="fas fa-eye text-3xl mr-3"></i>
                  <h2 class="text-xl font-bold">비전</h2>
                </div>
                <p class="text-sm leading-relaxed">
                  미래 교육을 선도하는 대한민국 대표 인재양성 기관으로 성장하여, 
                  교육 현장과 취업 시장의 가교 역할을 수행하며, 
                  지속 가능한 교육 생태계 조성에 앞장섭니다.
                </p>
              </div>

              <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-4 md:p-5 text-white">
                <div class="flex items-center mb-6">
                  <i class="fas fa-flag text-3xl mr-3"></i>
                  <h2 class="text-xl font-bold">미션</h2>
                </div>
                <p class="text-sm leading-relaxed">
                  전문 교육 프로그램을 통한 실무형 인재 양성, 
                  산학협력 네트워크 구축을 통한 취업 기회 확대, 
                  지속적인 교육 혁신으로 사회적 가치 창출을 실현합니다.
                </p>
              </div>
            </div>

            {/* 핵심 가치 */}
            <div class="bg-white rounded-2xl shadow-lg p-4 md:p-5">
              <h2 class="text-lg font-bold text-gray-900 mb-3 text-center">핵심 가치</h2>
              <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-rocket text-3xl text-blue-600"></i>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">혁신</h3>
                  <p class="text-gray-600">
                    끊임없는 교육 혁신을 통해 미래 교육을 선도합니다
                  </p>
                </div>

                <div class="text-center">
                  <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-handshake text-3xl text-green-600"></i>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">협력</h3>
                  <p class="text-gray-600">
                    32개 이상의 협력기관과 함께 상생의 교육 생태계를 만듭니다
                  </p>
                </div>

                <div class="text-center">
                  <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-award text-3xl text-purple-600"></i>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">전문성</h3>
                  <p class="text-gray-600">
                    검증된 전문 강사진과 체계적인 커리큘럼으로 최고의 교육을 제공합니다
                  </p>
                </div>
              </div>
            </div>

            {/* 주요 사업 */}
            <div class="bg-white rounded-2xl shadow-lg p-4 md:p-5">
              <h2 class="text-lg font-bold text-gray-900 mb-3">주요 사업</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-2">늘봄방과후 전문강사 양성</h3>
                    <p class="text-gray-600">초등학교 방과후 과정 전문 강사 교육</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-2">AI 활용 교육</h3>
                    <p class="text-gray-600">자기소개서, 면접, 교안 제작 등 실무 AI 교육</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-2">취업 지원 프로그램</h3>
                    <p class="text-gray-600">PSAT, NCS, GSAT 등 공기업 취업 준비</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-2">강사 양성 과정</h3>
                    <p class="text-gray-600">전문 강사로 성장할 수 있는 체계적 교육</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// President page - 대표 인사말
app.get('/president', (c) => {
  return c.html(
    <Layout title="대표 인사말 - 한국미래인재교육협회">
      <section class="py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center mb-6">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-4">대표 인사말</h1>
            <p class="text-base text-gray-600">한국미래인재교육협회를 방문해 주셔서 감사합니다</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="flex flex-col">
              {/* 대표 정보 영역 */}
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white text-center">
                <div class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <i class="fas fa-user text-5xl text-white/80"></i>
                </div>
                <h2 class="text-3xl font-bold mb-2">최유미</h2>
                <p class="text-xl">한국미래인재교육협회 대표</p>
              </div>

              {/* 인사말 내용 */}
              <div class="p-5 md:p-6">
                <div class="prose max-w-none">
                  <p class="text-gray-700 leading-relaxed mb-4 text-sm">
                    안녕하십니까. 한국미래인재교육협회 대표 최유미입니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-4 text-sm">
                    우리 협회는 급변하는 교육 환경 속에서 미래를 준비하는 인재 양성을 목표로 
                    2020년 설립되었습니다. 그동안 전북대, 경북대, 영남대 등 전국 32개 이상의 
                    교육기관과 협력하여 수많은 전문 인재를 배출해 왔습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-4 text-sm">
                    특히 늘봄방과후 전문강사 양성과정은 초등학교 방과후 교육의 질적 향상에 
                    크게 기여하고 있으며, AI 활용 교육 프로그램은 4차 산업혁명 시대에 필수적인 
                    디지털 역량 강화에 앞장서고 있습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-4 text-sm">
                    저희 협회는 단순한 자격증 취득을 넘어, 실무에서 바로 활용할 수 있는 
                    전문성을 갖춘 인재를 양성하는 데 최선을 다하고 있습니다. 
                    대학 재학생부터 경력 단절 여성, 퇴직 준비자까지 누구나 새로운 도전을 
                    시작할 수 있도록 체계적인 교육 프로그램을 제공하고 있습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-4 text-sm">
                    앞으로도 한국미래인재교육협회는 교육 현장과 취업 시장의 가교 역할을 충실히 수행하며, 
                    지속 가능한 교육 생태계 조성에 앞장서겠습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed font-semibold">
                    여러분의 꿈과 도전을 응원하겠습니다. 감사합니다.
                  </p>

                  <div class="mt-8 pt-6 border-t border-gray-200">
                    <p class="text-right text-gray-900 font-bold text-lg">
                      한국미래인재교육협회 대표 <span class="text-blue-600">최유미</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Organization page - 조직도
app.get('/organization', (c) => {
  return c.html(
    <Layout title="조직도 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-4">조직도</h1>
            <p class="text-base text-gray-600">한국미래인재교육협회 조직 구성 (정관 기준)</p>
          </div>

          {/* 대표(이사장) */}
          <div class="flex justify-center mb-8">
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-8 text-center min-w-[280px]">
              <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-crown text-3xl"></i>
              </div>
              <h2 class="text-2xl font-bold mb-2">대표 (이사장)</h2>
              <p class="text-xl">최유미</p>
            </div>
          </div>

          {/* 연결선 */}
          <div class="flex justify-center mb-8">
            <div class="w-1 h-12 bg-gray-300"></div>
          </div>

          {/* 이사 및 감사 */}
          <div class="max-w-5xl mx-auto mb-8">
            <div class="grid md:grid-cols-2 gap-6">
              {/* 이사 */}
              <div class="bg-white rounded-2xl shadow-lg p-8">
                <div class="text-center mb-6">
                  <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-users text-2xl text-purple-600"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">이사</h3>
                  <p class="text-sm text-gray-500 mt-2">정관 제8조: 2인 이상 10인 이하</p>
                </div>
                
                <div class="space-y-3">
                  <div class="text-center p-4 bg-purple-50 rounded-xl">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i class="fas fa-user-tie text-purple-600"></i>
                    </div>
                    <p class="font-bold text-gray-900 mb-1">윤지원</p>
                    <p class="text-sm text-gray-600">대전 지역본부 대표</p>
                  </div>
                  
                  <div class="text-center p-4 bg-purple-50 rounded-xl">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i class="fas fa-user-tie text-purple-600"></i>
                    </div>
                    <p class="font-bold text-gray-900 mb-1">강은지</p>
                    <p class="text-sm text-gray-600">자기주도·학습설계 강사</p>
                    <p class="text-xs text-gray-500 mt-1">페이머스유 이미지메이킹센터 대표</p>
                  </div>
                  
                  <div class="text-center p-4 bg-purple-50 rounded-xl">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i class="fas fa-user-tie text-purple-600"></i>
                    </div>
                    <p class="font-bold text-gray-900 mb-1">박상미</p>
                    <p class="text-sm text-gray-600">이사</p>
                  </div>
                  
                  <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p class="text-xs text-gray-600 leading-relaxed">
                      <i class="fas fa-info-circle text-blue-500 mr-1"></i>
                      이사는 이사회를 통하여 협회의 주요 사항을 심의·의결하며, 
                      이사장으로부터 위임받은 사항을 처리합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 감사 */}
              <div class="bg-white rounded-2xl shadow-lg p-8">
                <div class="text-center mb-6">
                  <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-balance-scale text-2xl text-amber-600"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">감사</h3>
                  <p class="text-sm text-gray-500 mt-2">정관 제8조: 1인</p>
                </div>
                
                <div class="space-y-3">
                  <div class="text-center p-4 bg-amber-50 rounded-xl">
                    <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i class="fas fa-user-check text-amber-600"></i>
                    </div>
                    <p class="font-bold text-gray-900 mb-1">송영희</p>
                    <p class="text-sm text-gray-600">회계 및 운영 감사</p>
                  </div>
                  
                  <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p class="text-xs text-gray-600 leading-relaxed">
                      <i class="fas fa-info-circle text-blue-500 mr-1"></i>
                      감사는 일반회계 및 운영에 대해 감사하며 부정 또는 부당한 점이 있을 경우 
                      이사회에 시정을 요구합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 연결선 */}
          <div class="flex justify-center mb-8">
            <div class="w-1 h-12 bg-gray-300"></div>
          </div>

          {/* 본부 전문위원 */}
          <div class="flex justify-center mb-8">
            <div class="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-user-graduate text-2xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">본부 전문위원</h3>
                <p class="text-sm text-gray-500 mt-2">각 분야별 전문 자문위원</p>
              </div>
              
              <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center p-4 bg-blue-50 rounded-xl">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-user-tie text-blue-600"></i>
                  </div>
                  <p class="font-bold text-gray-900 mb-1">정수일</p>
                  <p class="text-sm text-gray-600">경영시스템<br/>ESG, HR</p>
                </div>
                
                <div class="text-center p-4 bg-blue-50 rounded-xl">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-user-tie text-blue-600"></i>
                  </div>
                  <p class="font-bold text-gray-900 mb-1">김대원</p>
                  <p class="text-sm text-gray-600">진로상담<br/>취업컨설팅</p>
                </div>
                
                <div class="text-center p-4 bg-blue-50 rounded-xl">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-user-tie text-blue-600"></i>
                  </div>
                  <p class="font-bold text-gray-900 mb-1">박남현</p>
                  <p class="text-sm text-gray-600">서류·면접코칭<br/>취업특강</p>
                </div>
              </div>
            </div>
          </div>

          {/* 연결선 */}
          <div class="flex justify-center mb-8">
            <div class="w-1 h-12 bg-gray-300"></div>
          </div>

          {/* 지역본부 */}
          <div class="grid md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
            {/* 대구 지역본부 */}
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-map-marker-alt text-2xl text-green-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">대구 지역본부</h3>
              </div>
              
              <div class="space-y-3">
                <div class="border-l-4 border-green-500 pl-4">
                  <p class="text-sm text-gray-500 mb-1">대표</p>
                  <p class="font-bold text-gray-900">김대원</p>
                </div>

                <div class="pt-4 border-t border-gray-200">
                  <p class="text-sm font-bold text-gray-700 mb-3">담당 기관</p>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p>• 경북대학교</p>
                    <p>• 영남대학교</p>
                    <p>• 대구대학교</p>
                    <p>• 계명대학교</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 대전 지역본부 */}
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-map-marker-alt text-2xl text-purple-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">대전 지역본부</h3>
              </div>
              
              <div class="space-y-3">
                <div class="border-l-4 border-purple-500 pl-4">
                  <p class="text-sm text-gray-500 mb-1">대표</p>
                  <p class="font-bold text-gray-900">윤지원</p>
                </div>

                <div class="pt-4 border-t border-gray-200">
                  <p class="text-sm font-bold text-gray-700 mb-3">담당 기관</p>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p>• 한국기술교육대학교</p>
                    <p>• 배재대학교</p>
                    <p>• 나사렛대학교</p>
                    <p>• 한국철도공사</p>
                  </div>
                </div>

                <div class="pt-4 border-t border-gray-200">
                  <p class="text-sm font-bold text-gray-700 mb-3">주소</p>
                  <div class="text-sm text-gray-600">
                    <p>대전광역시 천동로 686</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center">
            <h3 class="text-2xl font-bold mb-4">협회 연락처</h3>
            <div class="flex flex-wrap justify-center gap-6 text-lg">
              <div class="flex items-center space-x-2">
                <i class="fas fa-phone"></i>
                <span>0507-1426-1547</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-envelope"></i>
                <span>info@kfea.ai.kr</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-map-marker-alt"></i>
                <span>서울특별시 강남구 논현로10길 30</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Programs page - 교육과정
app.get('/programs', (c) => {
  return c.html(
    <Layout title="교육과정 - 한국미래인재교육협회">
      <section class="py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center mb-6">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-3">교육과정</h1>
            <p class="text-base text-gray-600">체계적이고 전문적인 교육 프로그램을 만나보세요</p>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            {/* 늘봄방과후 전문강사 양성 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white">
                <div class="flex items-center mb-3">
                  <div class="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-chalkboard-teacher text-2xl"></i>
                  </div>
                  <h2 class="text-xl font-bold">늘봄방과후<br/>전문강사 양성</h2>
                </div>
              </div>
              <div class="p-5">
                <p class="text-gray-600 mb-4 text-sm">
                  초등학교 방과후 교육 전문가로 성장할 수 있는 체계적인 교육과정입니다.
                </p>
                <div class="space-y-2">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 대상</p>
                      <p class="text-gray-600 text-sm">대학생, 경력단절 여성, 퇴직 준비자</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 기간</p>
                      <p class="text-gray-600 text-sm">8주 과정 (주 2회, 총 32시간)</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">주요 내용</p>
                      <p class="text-gray-600 text-sm">아동 심리, 교수법, 교안 작성, 학급 운영</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">자격증</p>
                      <p class="text-gray-600 text-sm">방과후 지도사 민간자격증 취득 가능</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI 활용 교육 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-5 text-white">
                <div class="flex items-center mb-3">
                  <div class="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-robot text-2xl"></i>
                  </div>
                  <h2 class="text-xl font-bold">AI 활용 교육</h2>
                </div>
              </div>
              <div class="p-5">
                <p class="text-gray-600 mb-4 text-sm">
                  ChatGPT 등 최신 AI 도구를 활용한 실무 중심 교육 프로그램입니다.
                </p>
                <div class="space-y-2">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 대상</p>
                      <p class="text-gray-600 text-sm">대학생, 취업 준비생, 직장인</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 기간</p>
                      <p class="text-gray-600 text-sm">6주 과정 (주 1회, 총 18시간)</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">주요 내용</p>
                      <p class="text-gray-600 text-sm">자기소개서 작성, 면접 준비, 교안 제작, 업무 자동화</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">활용 도구</p>
                      <p class="text-gray-600 text-sm">ChatGPT, Midjourney, Notion AI 등</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 취업 지원 프로그램 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-green-500 to-green-600 p-5 text-white">
                <div class="flex items-center mb-3">
                  <div class="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-briefcase text-2xl"></i>
                  </div>
                  <h2 class="text-xl font-bold">취업 지원<br/>프로그램</h2>
                </div>
              </div>
              <div class="p-5">
                <p class="text-gray-600 mb-4 text-sm">
                  공기업 및 대기업 취업을 위한 맞춤형 취업 준비 프로그램입니다.
                </p>
                <div class="space-y-2">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 대상</p>
                      <p class="text-gray-600 text-sm">대학생, 취업 준비생</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 기간</p>
                      <p class="text-gray-600 text-sm">10주 과정 (주 2회, 총 40시간)</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">주요 내용</p>
                      <p class="text-gray-600 text-sm">PSAT, NCS, GSAT 대비, 면접 코칭, 자기소개서 첨삭</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">특별 혜택</p>
                      <p class="text-gray-600 text-sm">1:1 멘토링, 모의면접, 취업 컨설팅</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 강사 양성 과정 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-white">
                <div class="flex items-center mb-3">
                  <div class="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-graduation-cap text-2xl"></i>
                  </div>
                  <h2 class="text-xl font-bold">강사 양성 과정</h2>
                </div>
              </div>
              <div class="p-5">
                <p class="text-gray-600 mb-4 text-sm">
                  전문 강사로 성장할 수 있는 체계적인 코칭 프로그램입니다.
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 대상</p>
                      <p class="text-gray-600 text-sm">예비 강사, 현직 강사</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">교육 기간</p>
                      <p class="text-gray-600 text-sm">12주 과정 (주 1회, 총 36시간)</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">주요 내용</p>
                      <p class="text-gray-600 text-sm">강의 스킬, 콘텐츠 기획, 학습자 관리, 강사 마케팅</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">수료 후</p>
                      <p class="text-gray-600 text-sm">협회 네트워크를 통한 강의 기회 제공</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div class="mt-16 text-center">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 class="text-3xl font-bold mb-4">지금 바로 시작하세요!</h2>
              <p class="text-xl mb-8">체계적인 교육 프로그램으로 새로운 미래를 준비하세요</p>
              <div class="flex flex-wrap justify-center gap-4">
                <a href="/contact" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
                  문의하기
                </a>
                <a href="/" class="bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                  홈으로 돌아가기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Activities page - 활동소식
app.get('/activities', (c) => {
  // 모든 검색 결과를 날짜별로 정렬 (최신순)
  const newsArticles = [
    // 한국면접관협회 관련 기사
    { date: '2025-12-31', title: '한국면접관협회, 인문학 기반 면접관 마스터 자격과정 개최', link: 'https://www.lecturernews.com/news/articleView.html?idxno=194008', source: '한국강사신문' },
    { date: '2025-12-24', title: '[강사 인터뷰] 이제야 삶이 말이 되었다 이다인 강사를 만나다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=193591', source: '한국강사신문' },
    { date: '2025-10-16', title: '피엑스알랩, AI 기반 성과창출형 면접평가 협력 MOU 체결', link: 'https://www.lecturernews.com/news/articleView.html?idxno=188762', source: '한국강사신문' },
    { date: '2025-09-15', title: '한국면접관협회, 제23기 전문 면접관 마스터 교육과정 개최', link: 'https://www.lecturernews.com/news/articleView.html?idxno=186927', source: '한국강사신문' },
    { date: '2025-08-26', title: '한국면접관협회, 면접관의 시선 북토크 성료', link: 'https://www.lecturernews.com/news/articleView.html?idxno=185652', source: '한국강사신문' },
    { date: '2025-08-08', title: '[기획 인터뷰] 한국면접관협회 권혁근 협회장을 만나다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=184382', source: '한국강사신문' },
    { date: '2025-08-08', title: '한국면접관협회, 면접관 마스터 포럼에서 전문가 인물브랜딩 전략 공개', link: 'https://www.lecturernews.com/news/articleView.html?idxno=182998', source: '한국강사신문' },
    { date: '2025-08-26', title: '한국면접관협회, 제1회 대한민국 면접관 컨퍼런스 성공리에 마쳐', link: 'https://www.lecturernews.com/news/articleView.html?idxno=185650', source: '한국강사신문' },
    { date: '2025-08-08', title: '[오늘의 강사] 한국강사에이전시, 면접관교육 분야 권혁근 강사를 소개합니다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=185657', source: '한국강사신문' },
    
    // 한국미래인재교육협회 관련 기사 (2025년 최신)
    { date: '2025-12-30', title: '경기도교육청 평생학습관, 2025년 방과후지도사 양성과정 4기 운영 성료', link: 'https://www.lecturernews.com/news/articleView.html?idxno=193971', source: '한국강사신문' },
    { date: '2025-12-16', title: '순천제일대학교, 최유미 강사 초청 맞춤형 산업-기업-직무분석 특강 개최', link: 'https://www.lecturernews.com/news/articleView.html?idxno=192951', source: '한국강사신문' },
    { date: '2025-12-15', title: '한국미래인재교육협회-행복한진로심리이야기, NCS 진로심리검사 성료', link: 'https://www.lecturernews.com/news/articleView.html?idxno=192950', source: '한국강사신문' },
    { date: '2025-11-29', title: '서울시, 청년·시민참여형 AI 인재 행사 AI 인재 페스티벌 위크 개최', link: 'https://www.lecturernews.com/news/articleView.html?idxno=191654', source: '한국강사신문' },
    { date: '2025-09-15', title: '최유미 강사, 나사렛대학교서 취업을 앞당기는 노션 자기관리 전략 특강', link: 'https://www.lecturernews.com/news/articleView.html?idxno=186967', source: '한국강사신문' },
    { date: '2025-08-11', title: '최유미 강사, 실무 중심 늘봄 방과후 강사 양성과정 2기 성료', link: 'https://www.lecturernews.com/news/articleView.html?idxno=184403', source: '한국강사신문' },
    { date: '2025-07-23', title: '경기도인재개발원, 최유미 강사 초청 본캐는 공무원 부캐는 강사 특강 개최', link: 'https://www.lecturernews.com/news/articleView.html?idxno=183192', source: '한국강사신문' },
    { date: '2025-06-10', title: '대전교육청, 늘봄학교·중등 방과후학교 강사 운영 안내 자료 배포', link: 'https://www.lecturernews.com/news/articleView.html?idxno=180081', source: '한국강사신문' },
    { date: '2025-04-17', title: '한국미래인재교육협회 X 세무회계 소명, 종합소득세 신고 지원', link: 'https://www.lecturernews.com/news/articleView.html?idxno=176409', source: '한국강사신문' },
    { date: '2025-02-22', title: '한국미래인재교육협회, 프리랜서 강사를 위한 맞춤 세무관리 교육', link: 'https://www.lecturernews.com/news/articleView.html?idxno=172944', source: '한국강사신문' },
    { date: '2025-02-13', title: '교육부, 2025년 학교복합시설 1차 선정 공모 실시… 봄교실 현장실습장 구축', link: 'https://www.lecturernews.com/news/articleView.html?idxno=172342', source: '한국강사신문' },
    { date: '2025-01-23', title: '인천남부교육지원청, 2025학년도 늘봄학교 프로그램 외부 강사 122명 선발', link: 'https://www.lecturernews.com/news/articleView.html?idxno=171052', source: '한국강사신문' },
    { date: '2025-01-15', title: '인천강화교육지원청, 늘봄(방과후)학교 프로그램 외부 강사 모집', link: 'https://www.lecturernews.com/news/articleView.html?idxno=170409', source: '한국강사신문' },
    { date: '2024-12-16', title: '한국강사신문 대표가 만난 강사, 한국미래인재교육협회 최유미 협회장 인터뷰', link: 'https://www.lecturernews.com/news/articleView.html?idxno=168376', source: '한국강사신문' },
    { date: '2025-08-08', title: '천안·오산까지 결혼이주여성 대상 이중언어강사양성과정 성료', link: 'https://www.lecturernews.com/news/articleView.html?idxno=184400', source: '한국강사신문' },
    { date: '2025-03-14', title: '[최유미의 커리어 디렉팅] 새로운 도약을 위한 준비, 경력단절 여성을 위한 재취업 전략', link: 'https://www.lecturernews.com/news/articleView.html?idxno=174248', source: '한국강사신문' },
    { date: '2025-02-06', title: '[오늘의 강사] 한국강사에이전시, 강사양성 분야 최유미 강사를 소개합니다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=171702', source: '한국강사신문' },
    
    // 강은지 이사 관련 기사
    { date: '2025-11-28', title: '[주간강사] 한국강사에이전시가 김기연, 정진, 윤선동, 강은지 강사를 소개합니다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=191647', source: '한국강사신문' },
    { date: '2025-10-24', title: '[강은지의 이미지메이킹 인사이트] 첫인상이 당신의 미래를 결정한다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=189268', source: '한국강사신문' },
    { date: '2025-10-15', title: '[오늘의 강사] 한국강사에이전시, 이미지메이킹 분야 강은지 강사를 소개합니다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=188684', source: '한국강사신문' },
    { date: '2025-10-02', title: '[강사 인터뷰] 페이머스유 이미지메이킹센터 강은지 대표를 만나다', link: 'https://www.lecturernews.com/news/articleView.html?idxno=188067', source: '한국강사신문' },
    { date: '2025-06-13', title: '색이 나를 설명한다, 퍼스널컬러에서 강의 동선까지 강은지 강사의 강의 철학', link: 'https://www.lecturernews.com/news/articleView.html?idxno=180382', source: '한국강사신문' },
  ].sort((a, b) => b.date.localeCompare(a.date)) // 최신순 정렬

  return c.html(
    <Layout title="활동소식 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">활동소식</h1>
            <p class="text-base text-gray-600">한국강사신문에 소개된 협회 활동 소식</p>
          </div>
          
          <div class="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
            <div class="flex items-center">
              <i class="fas fa-info-circle text-blue-600 mr-3"></i>
              <p class="text-sm text-blue-800">
                <strong>총 {newsArticles.length}건</strong>의 기사가 검색되었습니다. 
                클릭하시면 한국강사신문 기사 페이지로 이동합니다.
              </p>
            </div>
          </div>

          <div class="space-y-3">
            {newsArticles.map((article, index) => (
              <a href={article.link} target="_blank" rel="noopener noreferrer"
                 class="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-4 border-l-4 border-blue-500 hover:border-blue-600">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-3">
                        <i class="fas fa-newspaper mr-1"></i>
                        {article.source}
                      </span>
                      <span class="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <i class="fas fa-external-link-alt text-gray-400 text-xl"></i>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div class="mt-12 text-center">
            <a href="https://www.lecturernews.com" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              <i class="fas fa-newspaper"></i>
              <span>한국강사신문 방문하기</span>
              <i class="fas fa-external-link-alt text-sm"></i>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Seoul Branch page - 서울 본부
app.get('/seoul-branch', (c) => {
  return c.html(
    <Layout title="서울 본부 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">서울 본부</h1>
            <p class="text-lg text-gray-600">한국미래인재교육협회 본부</p>
          </div>

          {/* 본부 정보 */}
          <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">본부 정보</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-user-tie text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 mb-1">본부 대표</p>
                  <p class="text-gray-600">최유미</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-phone text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 mb-1">전화</p>
                  <p class="text-gray-600">0507-1426-1547</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 mb-1">주소</p>
                  <p class="text-gray-600">서울특별시 강남구 논현로10길 30 505-62호</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-envelope text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 mb-1">이메일</p>
                  <p class="text-gray-600">info@kfea.ai.kr</p>
                </div>
              </div>
            </div>
          </div>

          {/* 이사진 */}
          <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-purple-600">이사진</h2>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user-tie text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">윤지원</p>
                    <p class="text-xs text-purple-700">이사</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">대전 지역본부 대표</p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user-tie text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">강은지</p>
                    <p class="text-xs text-purple-700">이사</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">자기주도·학습설계 강사</p>
                <p class="text-xs text-gray-600 mt-1">페이머스유 이미지메이킹센터 대표</p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user-tie text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">박상미</p>
                    <p class="text-xs text-purple-700">이사</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 감사 */}
          <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-amber-600">감사</h2>
            <div class="max-w-md">
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border-2 border-amber-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-balance-scale text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">송영희</p>
                    <p class="text-xs text-amber-700">감사</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">회계 및 운영 감사</p>
              </div>
            </div>
          </div>

          {/* 본부 전문위원 */}
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">본부 전문위원</h2>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user-graduate text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">정수일</p>
                    <p class="text-xs text-blue-700">전문위원</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">경영시스템, ESG, HR</p>
              </div>
              
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user-graduate text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">김대원</p>
                    <p class="text-xs text-blue-700">전문위원</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">진로상담, 취업컨설팅</p>
              </div>
              
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user-graduate text-white"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">박남현</p>
                    <p class="text-xs text-blue-700">전문위원</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">서류·면접코칭, 취업특강</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Daegu Branch page - 대구 지역본부
app.get('/daegu-branch', (c) => {
  return c.html(
    <Layout title="대구 지역본부 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-4">대구 지역본부</h1>
            <p class="text-base text-gray-600">영남권 교육 거점</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">본부 정보</h2>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-user-tie text-green-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">대표</p>
                      <p class="text-gray-600">김대원</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-phone text-green-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">문의</p>
                      <p class="text-gray-600">본부 0507-1426-1547</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">담당 기관</h2>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-green-600 text-lg mt-1"></i>
                    <p class="text-gray-700">경북대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-green-600 text-lg mt-1"></i>
                    <p class="text-gray-700">영남대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-green-600 text-lg mt-1"></i>
                    <p class="text-gray-700">대구대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-green-600 text-lg mt-1"></i>
                    <p class="text-gray-700">계명대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-ellipsis-h text-green-600 text-lg mt-1"></i>
                    <p class="text-gray-700 font-semibold">그 외 다수</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Daejeon Branch page - 대전 지역본부
app.get('/daejeon-branch', (c) => {
  return c.html(
    <Layout title="대전 지역본부 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-4">대전 지역본부</h1>
            <p class="text-base text-gray-600">충청권 교육 거점</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">본부 정보</h2>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-user-tie text-purple-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">대표</p>
                      <p class="text-gray-600">윤지원</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-map-marker-alt text-purple-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">주소</p>
                      <p class="text-gray-600">대전광역시 천동로 686</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-phone text-purple-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">문의</p>
                      <p class="text-gray-600">본부 0507-1426-1547</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">담당 기관</h2>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-purple-600 text-lg mt-1"></i>
                    <p class="text-gray-700">한국기술교육대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-purple-600 text-lg mt-1"></i>
                    <p class="text-gray-700">배재대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-university text-purple-600 text-lg mt-1"></i>
                    <p class="text-gray-700">나사렛대학교</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-building text-purple-600 text-lg mt-1"></i>
                    <p class="text-gray-700">한국철도공사</p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-ellipsis-h text-purple-600 text-lg mt-1"></i>
                    <p class="text-gray-700 font-semibold">그 외 다수</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Classroom page - 강의실 (준비 중)
app.get('/classroom', (c) => {
  return c.html(
    <Layout title="강의실 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px] flex items-center">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <i class="fas fa-chalkboard-teacher text-5xl text-blue-600 mb-6"></i>
            <h1 class="text-3xl font-bold text-gray-900 mb-4">온라인 강의실</h1>
            <p class="text-base text-gray-600 mb-8">
              현재 준비 중입니다.<br />
              곧 더 나은 서비스로 찾아뵙겠습니다.
            </p>
            <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Notice Board - 공지사항
app.get('/boards/notice', async (c) => {
  try {
    const db = c.env.DB
    
    // 공지사항 목록 조회
    const notices = await db.prepare(
      'SELECT id, title, content, is_popup, created_at FROM notices WHERE is_published = 1 ORDER BY created_at DESC LIMIT 20'
    ).all()
    
    return c.html(
      <Layout title="공지사항 - 한국미래인재교육협회">
        <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">공지사항</h1>
            
            {notices.results.length > 0 ? (
              <div class="space-y-3">
                {notices.results.map((notice: any) => {
                  const date = new Date(notice.created_at).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', '.')
                  const shortContent = notice.content.substring(0, 100) + (notice.content.length > 100 ? '...' : '')
                  
                  return (
                    <a href={`/boards/notice/${notice.id}`} class="block">
                      <div class="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div class="flex items-center mb-2">
                          {notice.is_popup ? (
                            <span class="bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded mr-3">중요</span>
                          ) : (
                            <span class="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded mr-3">일반</span>
                          )}
                          <span class="text-gray-500 text-sm">{date}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">{notice.title}</h3>
                        <p class="text-gray-600">{shortContent}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            ) : (
              <div class="bg-white rounded-lg p-8 text-center">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-base text-gray-600">등록된 공지사항이 없습니다.</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    )
  } catch (error) {
    console.error('Notice list error:', error)
    return c.html(
      <Layout title="공지사항 - 한국미래인재교육협회">
        <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">공지사항</h1>
            <div class="bg-white rounded-lg p-8 text-center">
              <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
              <p class="text-base text-gray-600">공지사항을 불러오는 중 오류가 발생했습니다.</p>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
})

// 공지사항 상세 페이지
app.get('/boards/notice/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const db = c.env.DB
    
    // 공지사항 조회 및 조회수 증가
    const notice = await db.prepare(
      'SELECT id, title, content, created_at, views FROM notices WHERE id = ? AND is_published = 1'
    ).bind(id).first()
    
    if (!notice) {
      return c.html(
        <Layout title="공지사항 - 한국미래인재교육협회">
          <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="bg-white rounded-lg p-8 text-center">
                <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-4"></i>
                <p class="text-base text-gray-600 mb-4">존재하지 않는 공지사항입니다.</p>
                <a href="/boards/notice" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  목록으로 돌아가기
                </a>
              </div>
            </div>
          </section>
        </Layout>
      )
    }
    
    // 조회수 증가
    await db.prepare(
      'UPDATE notices SET views = views + 1 WHERE id = ?'
    ).bind(id).run()
    
    const date = new Date(notice.created_at).toLocaleDateString('ko-KR')
    
    return c.html(
      <Layout title={`${notice.title} - 한국미래인재교육협회`}>
        <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <div class="border-b pb-6 mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{notice.title}</h1>
                <div class="flex items-center text-sm text-gray-600 space-x-4">
                  <span><i class="far fa-calendar mr-2"></i>{date}</span>
                  <span><i class="far fa-eye mr-2"></i>조회 {notice.views}</span>
                </div>
              </div>
              
              <div class="prose max-w-none">
                <div class="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                  {notice.content}
                </div>
              </div>
              
              <div class="mt-8 pt-6 border-t flex justify-center">
                <a href="/boards/notice" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  <i class="fas fa-list mr-2"></i>목록으로
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  } catch (error) {
    console.error('Notice detail error:', error)
    return c.html(
      <Layout title="오류 - 한국미래인재교육협회">
        <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg p-8 text-center">
              <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
              <p class="text-base text-gray-600 mb-4">공지사항을 불러오는 중 오류가 발생했습니다.</p>
              <a href="/boards/notice" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                목록으로 돌아가기
              </a>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
})

// Resources Board - 자료실
app.get('/boards/resources', (c) => {
  return c.html(
    <Layout title="자료실 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">자료실</h1>
            <p class="text-base text-gray-600">교육 자료 및 참고 문서를 제공합니다</p>
          </div>
          
          <div class="bg-white rounded-lg p-8 text-center">
            <i class="fas fa-folder-open text-4xl text-gray-400 mb-4"></i>
            <p class="text-base text-gray-600 mb-4">준비 중입니다.</p>
            <p class="text-sm text-gray-500">교육 자료 및 관련 문서를 순차적으로 업로드할 예정입니다.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// QnA Board - Q&A
app.get('/boards/qna', (c) => {
  return c.html(
    <Layout title="Q&A - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Q&A</h1>
          
          <div class="bg-white rounded-lg p-8 text-center">
            <i class="fas fa-question-circle text-4xl text-gray-400 mb-4"></i>
            <p class="text-base text-gray-600 mb-4">궁금한 점이 있으신가요?</p>
            <a href="/contact" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              문의하기
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Gallery Board - 갤러리
app.get('/boards/gallery', (c) => {
  return c.html(
    <Layout title="갤러리 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-[400px]">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">갤러리</h1>
          
          <div class="bg-white rounded-lg p-8 text-center">
            <i class="fas fa-images text-4xl text-gray-400 mb-4"></i>
            <p class="text-base text-gray-600">준비 중입니다.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Certifications page - 자격증 과정
app.get('/programs/certifications', (c) => {
  return c.html(
    <Layout title="자격증 과정 - 한국미래인재교육협회">
      <section class="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">민간자격증 과정</h1>
            <p class="text-lg text-gray-600">한국미래인재교육협회 등록 민간자격증</p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 mb-12">
            {/* 스피치지도사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <i class="fas fa-microphone text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">스피치지도사</h3>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <p class="text-sm text-gray-500 mb-2">민간자격증 | 한국미래인재교육협회</p>
                  <p class="text-gray-700 leading-relaxed">효과적인 의사소통과 발표 능력을 지도하는 전문 자격증입니다.</p>
                </div>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check text-blue-500 mr-2 mt-1"></i>
                    <span>단일 등급</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-blue-500 mr-2 mt-1"></i>
                    <span>활용: 교육기관, 기업체, 공공기관</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 늘봄방과후프로그램강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                <i class="fas fa-school text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">늘봄방과후프로그램강사</h3>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <p class="text-sm text-gray-500 mb-2">민간자격증 | 한국미래인재교육협회</p>
                  <p class="text-gray-700 leading-relaxed">초등학교 방과후 및 돌봄 프로그램 전문강사 자격증입니다.</p>
                </div>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check text-purple-500 mr-2 mt-1"></i>
                    <span>단일 등급</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-purple-500 mr-2 mt-1"></i>
                    <span>활용: 초등 방과후학교, 돌봄교실</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 취업진로디렉터 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <i class="fas fa-briefcase text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">취업진로디렉터</h3>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <p class="text-sm text-gray-500 mb-2">민간자격증 | 한국미래인재교육협회</p>
                  <p class="text-gray-700 leading-relaxed">취업 및 진로 상담 전문가 자격증입니다.</p>
                </div>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                    <span>단일 등급</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                    <span>활용: 대학, 취업지원센터, 상담기관</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 기후위기대응교육강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
                <i class="fas fa-globe text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">기후위기대응교육강사</h3>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <p class="text-sm text-gray-500 mb-2">민간자격증 | 한국미래인재교육협회</p>
                  <p class="text-gray-700 leading-relaxed">기후변화 대응 교육 전문가 자격증입니다.</p>
                </div>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check text-teal-500 mr-2 mt-1"></i>
                    <span>단일 등급</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-teal-500 mr-2 mt-1"></i>
                    <span>활용: 환경교육기관, 학교, 기업 ESG</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 제로웨이스트실천교육강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white">
                <i class="fas fa-recycle text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">제로웨이스트실천교육강사</h3>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <p class="text-sm text-gray-500 mb-2">민간자격증 | 한국미래인재교육협회</p>
                  <p class="text-gray-700 leading-relaxed">제로웨이스트 실천 교육 전문가 자격증입니다.</p>
                </div>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check text-emerald-500 mr-2 mt-1"></i>
                    <span>단일 등급</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-emerald-500 mr-2 mt-1"></i>
                    <span>활용: 환경교육센터, 지역사회, 기업</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 시니어라이프코칭강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                <i class="fas fa-hand-holding-heart text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">시니어라이프코칭강사</h3>
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <p class="text-sm text-gray-500 mb-2">민간자격증 | 한국미래인재교육협회</p>
                  <p class="text-gray-700 leading-relaxed">시니어 라이프 코칭 전문가 자격증입니다.</p>
                </div>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-check text-orange-500 mr-2 mt-1"></i>
                    <span>단일 등급</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-orange-500 mr-2 mt-1"></i>
                    <span>활용: 노인복지관, 평생교육기관</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 신청 안내 */}
          <div class="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">자격증 신청 안내</h2>
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <i class="fas fa-clipboard-list text-blue-500 mr-2"></i>
                  신청 절차
                </h3>
                <ol class="space-y-2 text-gray-700">
                  <li class="flex items-start">
                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">1</span>
                    <span>교육 과정 선택 및 수강 신청</span>
                  </li>
                  <li class="flex items-start">
                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">2</span>
                    <span>정규 교육 과정 이수 (출석률 80% 이상)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">3</span>
                    <span>자격 시험 응시 (필기 또는 실기)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">4</span>
                    <span>합격 후 자격증 발급 신청</span>
                  </li>
                </ol>
              </div>
              
              <div class="bg-blue-50 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                  상세 정보 안내
                </h3>
                <p class="text-gray-700 leading-relaxed mb-3">
                  각 자격증별 교육 기간, 교육비, 운영 일정 등 상세 정보는 협의를 통해 결정됩니다.
                </p>
                <p class="text-gray-700 leading-relaxed">
                  자격증 취득에 관심이 있으신 분은 아래 문의하기 버튼을 통해 연락 주시면 
                  맞춤형 상담을 제공해 드립니다.
                </p>
              </div>
            </div>
            
            <div class="mt-8 text-center">
              <a href="/contact" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                <i class="fas fa-phone-alt mr-2"></i>
                자격증 상담 문의하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Login page - 로그인
app.get('/login', (c) => {
  return c.html(
    <Layout title="로그인 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-user-circle text-blue-600 text-4xl"></i>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
              <p class="text-gray-600">한국미래인재교육협회에 오신 것을 환영합니다</p>
            </div>

            <form class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input type="email" id="email" name="email" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="example@email.com" />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <input type="password" id="password" name="password" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="비밀번호를 입력하세요" />
              </div>

              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span class="ml-2 text-gray-600">로그인 상태 유지</span>
                </label>
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">비밀번호 찾기</a>
              </div>

              <button type="submit"
                      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                로그인
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-gray-600">
                계정이 없으신가요?
                <a href="/register" class="text-blue-600 hover:text-blue-700 font-bold ml-2">회원가입</a>
              </p>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200">
              <p class="text-center text-sm text-gray-500 mb-4">또는 다른 방법으로 로그인</p>
              <div class="grid grid-cols-2 gap-4">
                <button class="flex items-center justify-center bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  <i class="fab fa-google text-red-500 mr-2"></i>
                  Google
                </button>
                <button class="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors">
                  <i class="fas fa-comment text-gray-900 mr-2"></i>
                  Kakao
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Register page - 회원가입
app.get('/register', (c) => {
  return c.html(
    <Layout title="회원가입 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-user-plus text-blue-600 text-4xl"></i>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
              <p class="text-gray-600">한국미래인재교육협회 회원이 되어주세요</p>
            </div>

            <form class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input type="text" id="name" name="name" required
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         placeholder="홍길동" />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">전화번호 *</label>
                  <input type="tel" id="phone" name="phone" required
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         placeholder="010-1234-5678" />
                </div>
              </div>

              <div>
                <label for="reg-email" class="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <input type="email" id="reg-email" name="email" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="example@email.com" />
              </div>

              <div>
                <label for="reg-password" class="block text-sm font-medium text-gray-700 mb-2">비밀번호 *</label>
                <input type="password" id="reg-password" name="password" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="8자 이상 입력하세요" />
              </div>

              <div>
                <label for="password-confirm" class="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인 *</label>
                <input type="password" id="password-confirm" name="password_confirm" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="비밀번호를 다시 입력하세요" />
              </div>

              <div>
                <label for="interest" class="block text-sm font-medium text-gray-700 mb-2">관심 분야</label>
                <select id="interest" name="interest"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">선택하세요</option>
                  <option value="after-school">늘봄방과후 전문강사</option>
                  <option value="ai">AI 활용 교육</option>
                  <option value="job">취업 지원 프로그램</option>
                  <option value="instructor">강사 양성 과정</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="flex items-start">
                  <input type="checkbox" required class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
                  <span class="ml-2 text-sm text-gray-600">
                    <span class="text-blue-600 font-medium">[필수]</span> 이용약관에 동의합니다
                  </span>
                </label>
                <label class="flex items-start">
                  <input type="checkbox" required class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
                  <span class="ml-2 text-sm text-gray-600">
                    <span class="text-blue-600 font-medium">[필수]</span> 개인정보 수집 및 이용에 동의합니다
                  </span>
                </label>
                <label class="flex items-start">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
                  <span class="ml-2 text-sm text-gray-600">
                    <span class="text-gray-500">[선택]</span> 마케팅 정보 수신에 동의합니다
                  </span>
                </label>
              </div>

              <button type="submit"
                      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                회원가입
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-gray-600">
                이미 계정이 있으신가요?
                <a href="/login" class="text-blue-600 hover:text-blue-700 font-bold ml-2">로그인</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// ==========================================
// 관리자 모드
// ==========================================

// 관리자 로그인 페이지
app.get('/admin/login', (c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 로그인 - 한국미래인재교육협회</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full mx-4">
          <div class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-lock text-3xl text-white"></i>
              </div>
              <h1 class="text-2xl font-bold text-gray-900">관리자 로그인</h1>
              <p class="text-gray-600 mt-2">한국미래인재교육협회 관리자 페이지</p>
            </div>

            <form id="admin-login-form" class="space-y-6">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-user mr-2"></i>아이디
                </label>
                <input type="text" id="username" name="username" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="관리자 아이디를 입력하세요" />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-key mr-2"></i>비밀번호
                </label>
                <input type="password" id="password" name="password" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="비밀번호를 입력하세요" />
              </div>

              <div id="error-message" class="hidden bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p class="text-sm text-red-700"></p>
              </div>

              <button type="submit"
                      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <i class="fas fa-sign-in-alt mr-2"></i>
                로그인
              </button>
            </form>

            <div class="mt-6 text-center">
              <a href="/" class="text-gray-600 hover:text-blue-600 text-sm">
                <i class="fas fa-arrow-left mr-1"></i>홈으로 돌아가기
              </a>
            </div>
          </div>
        </div>

        <script>{`
          document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('error-message');
            
            try {
              const response = await fetch('/admin/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
              });
              
              const data = await response.json();
              
              if (data.success) {
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin_user', JSON.stringify(data.admin));
                window.location.href = '/admin/dashboard';
              } else {
                errorDiv.classList.remove('hidden');
                errorDiv.querySelector('p').textContent = data.error || '로그인에 실패했습니다.';
              }
            } catch (error) {
              errorDiv.classList.remove('hidden');
              errorDiv.querySelector('p').textContent = '서버 오류가 발생했습니다.';
            }
          });
        `}</script>
      </body>
    </html>
  )
})

// 관리자 대시보드
app.get('/admin/dashboard', (c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 대시보드 - 한국미래인재교육협회</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-100 min-h-screen">
        {/* 관리자 네비게이션 */}
        <nav class="bg-white shadow-lg">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <i class="fas fa-shield-alt text-2xl text-blue-600 mr-3"></i>
                <span class="text-xl font-bold text-gray-900">관리자 페이지</span>
              </div>
              <div class="flex items-center space-x-4">
                <a href="/" target="_blank" class="text-gray-600 hover:text-blue-600">
                  <i class="fas fa-external-link-alt mr-1"></i>사이트 보기
                </a>
                <button onclick="logout()" class="text-gray-600 hover:text-red-600">
                  <i class="fas fa-sign-out-alt mr-1"></i>로그아웃
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div class="flex">
          {/* 사이드바 */}
          <aside class="w-64 bg-white shadow-lg min-h-screen">
            <div class="p-6">
              <nav class="space-y-2">
                <a href="/admin/dashboard" class="flex items-center px-4 py-3 text-gray-700 bg-blue-50 rounded-lg font-medium">
                  <i class="fas fa-home w-5"></i>
                  <span class="ml-3">대시보드</span>
                </a>
                <a href="/admin/activities" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-newspaper w-5"></i>
                  <span class="ml-3">활동소식 관리</span>
                </a>
                <a href="/admin/notices" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-bullhorn w-5"></i>
                  <span class="ml-3">공지사항 관리</span>
                </a>
                <a href="/admin/resources" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-folder-open w-5"></i>
                  <span class="ml-3">자료실 관리</span>
                </a>
                <a href="/admin/settings" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-cog w-5"></i>
                  <span class="ml-3">설정</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main class="flex-1 p-8">
            <div class="max-w-7xl mx-auto">
              <h1 class="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>

              {/* 통계 카드 */}
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <i class="fas fa-newspaper text-2xl text-white"></i>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">활동소식</dt>
                        <dd class="text-2xl font-bold text-gray-900">31건</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <i class="fas fa-bullhorn text-2xl text-white"></i>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">공지사항</dt>
                        <dd class="text-2xl font-bold text-gray-900">3건</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <i class="fas fa-folder-open text-2xl text-white"></i>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">자료실</dt>
                        <dd class="text-2xl font-bold text-gray-900">0건</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <i class="fas fa-users text-2xl text-white"></i>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">회원</dt>
                        <dd class="text-2xl font-bold text-gray-900">0명</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* 빠른 작업 */}
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">빠른 작업</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="/admin/activities" class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <i class="fas fa-plus-circle text-2xl text-blue-600 mr-3"></i>
                    <span class="font-medium text-gray-900">활동소식 추가</span>
                  </a>
                  <a href="/admin/notices" class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                    <i class="fas fa-plus-circle text-2xl text-green-600 mr-3"></i>
                    <span class="font-medium text-gray-900">공지사항 작성</span>
                  </a>
                  <a href="/admin/resources" class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all">
                    <i class="fas fa-upload text-2xl text-yellow-600 mr-3"></i>
                    <span class="font-medium text-gray-900">자료 업로드</span>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>

        <script>{`
          // 인증 체크
          const token = localStorage.getItem('admin_token');
          if (!token) {
            window.location.href = '/admin/login';
          }
          
          function logout() {
            if (confirm('로그아웃 하시겠습니까?')) {
              localStorage.removeItem('admin_token');
              window.location.href = '/admin/login';
            }
          }
        `}</script>
      </body>
    </html>
  )
})

// 활동소식 관리 페이지
app.get('/admin/activities', (c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>활동소식 관리 - 관리자</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-100 min-h-screen">
        <nav class="bg-white shadow-lg">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <i class="fas fa-shield-alt text-2xl text-blue-600 mr-3"></i>
                <span class="text-xl font-bold text-gray-900">활동소식 관리</span>
              </div>
              <div class="flex items-center space-x-4">
                <a href="/admin/dashboard" class="text-gray-600 hover:text-blue-600">
                  <i class="fas fa-home mr-1"></i>대시보드
                </a>
                <button onclick="logout()" class="text-gray-600 hover:text-red-600">
                  <i class="fas fa-sign-out-alt mr-1"></i>로그아웃
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900">활동소식 목록</h2>
              <button onclick="showAddForm()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                <i class="fas fa-plus mr-2"></i>새 기사 추가
              </button>
            </div>

            {/* 기사 추가 폼 (숨김 상태) */}
            <div id="add-form" class="hidden mb-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">새 기사 추가</h3>
              <form id="article-form" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">날짜 (YYYY-MM-DD)</label>
                  <input type="text" id="article-date" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                         placeholder="2026-01-27" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input type="text" id="article-title" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                         placeholder="기사 제목을 입력하세요" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">링크 (idxno)</label>
                  <input type="text" id="article-link" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                         placeholder="195600" />
                  <p class="text-sm text-gray-500 mt-1">기사 번호만 입력하세요 (예: 195600)</p>
                </div>
                <div class="flex space-x-3">
                  <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                    추가
                  </button>
                  <button type="button" onclick="hideAddForm()" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium">
                    취소
                  </button>
                </div>
              </form>
            </div>

            {/* 기사 추가 안내 */}
            <div class="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
              <p class="text-sm text-green-800">
                <i class="fas fa-check-circle mr-2"></i>
                D1 데이터베이스 연동 완료! 활동소식을 자유롭게 추가, 수정, 삭제할 수 있습니다.
              </p>
            </div>

            {/* 기사 목록 */}
            <div id="articles-list" class="space-y-3">
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
                <p>기사 목록을 불러오는 중...</p>
              </div>
            </div>
          </div>
        </div>

        <script>{`
          const token = localStorage.getItem('admin_token');
          if (!token) window.location.href = '/admin/login';
          
          let articles = [];
          let editingId = null;
          
          // 페이지 로드시 기사 목록 불러오기
          loadArticles();
          
          function logout() {
            if (confirm('로그아웃 하시겠습니까?')) {
              localStorage.removeItem('admin_token');
              localStorage.removeItem('admin_user');
              window.location.href = '/admin/login';
            }
          }
          
          function showAddForm() {
            editingId = null;
            document.getElementById('add-form').classList.remove('hidden');
            document.getElementById('article-form').reset();
          }
          
          function hideAddForm() {
            editingId = null;
            document.getElementById('add-form').classList.add('hidden');
            document.getElementById('article-form').reset();
          }
          
          // 기사 목록 불러오기
          async function loadArticles() {
            try {
              const response = await fetch('/admin/api/activities', {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              });
              
              if (!response.ok) {
                throw new Error('Failed to load articles');
              }
              
              const data = await response.json();
              articles = data.data || [];
              renderArticles();
            } catch (error) {
              console.error('Load error:', error);
              document.getElementById('articles-list').innerHTML = 
                '<div class="text-center py-8 text-red-500"><i class="fas fa-exclamation-circle text-4xl mb-4"></i><p>기사 목록을 불러오는데 실패했습니다.</p></div>';
            }
          }
          
          // 기사 목록 렌더링
          function renderArticles() {
            const listDiv = document.getElementById('articles-list');
            
            if (articles.length === 0) {
              listDiv.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-inbox text-4xl mb-4"></i><p>등록된 기사가 없습니다.</p></div>';
              return;
            }
            
            listDiv.innerHTML = articles.map(article => \`
              <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">\${article.source}</span>
                      <span class="text-sm text-gray-500">\${article.date}</span>
                    </div>
                    <h3 class="font-medium text-gray-900 mb-1">\${article.title}</h3>
                    <a href="\${article.link}" target="_blank" 
                       class="text-sm text-blue-600 hover:underline">
                      <i class="fas fa-external-link-alt mr-1"></i>기사 보기
                    </a>
                  </div>
                  <div class="ml-4 flex space-x-2">
                    <button onclick="editArticle(\${article.id})" class="text-gray-400 hover:text-blue-600 p-2">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteArticle(\${article.id})" class="text-gray-400 hover:text-red-600 p-2">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            \`).join('');
          }
          
          // 기사 추가/수정 폼 제출
          document.getElementById('article-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const date = document.getElementById('article-date').value;
            const title = document.getElementById('article-title').value;
            const idxno = document.getElementById('article-link').value;
            
            if (!date || !title || !idxno) {
              alert('모든 항목을 입력해주세요.');
              return;
            }
            
            try {
              const url = editingId 
                ? \`/admin/api/activities/\${editingId}\`
                : '/admin/api/activities';
              const method = editingId ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method: method,
                headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, title, idxno })
              });
              
              const data = await response.json();
              
              if (data.success) {
                alert(data.message);
                hideAddForm();
                loadArticles();
              } else {
                alert(data.error || '처리 중 오류가 발생했습니다.');
              }
            } catch (error) {
              console.error('Submit error:', error);
              alert('서버 오류가 발생했습니다.');
            }
          });
          
          // 기사 수정
          function editArticle(id) {
            const article = articles.find(a => a.id === id);
            if (!article) return;
            
            editingId = id;
            document.getElementById('article-date').value = article.date;
            document.getElementById('article-title').value = article.title;
            
            // idxno 추출 (링크에서)
            const match = article.link.match(/idxno=(\\d+)/);
            if (match) {
              document.getElementById('article-link').value = match[1];
            }
            
            document.getElementById('add-form').classList.remove('hidden');
          }
          
          // 기사 삭제
          async function deleteArticle(id) {
            if (!confirm('정말 삭제하시겠습니까?')) return;
            
            try {
              const response = await fetch(\`/admin/api/activities/\${id}\`, {
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              });
              
              const data = await response.json();
              
              if (data.success) {
                alert(data.message);
                loadArticles();
              } else {
                alert(data.error || '삭제 중 오류가 발생했습니다.');
              }
            } catch (error) {
              console.error('Delete error:', error);
              alert('서버 오류가 발생했습니다.');
            }
          }
        `}</script>
      </body>
    </html>
  )
})

// ==================== 관리자 API 인증 미들웨어 ====================

// JWT 토큰 검증 미들웨어
const adminAuth = async (c: any, next: () => Promise<void>) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: '인증이 필요합니다' }, 401)
  }
  
  const token = authHeader.substring(7)
  
  try {
    const payload = await verify(token, JWT_SECRET, 'HS256')
    c.set('adminUser', payload)
    await next()
  } catch (error) {
    console.error('Token verification error:', error)
    return c.json({ error: '유효하지 않은 토큰입니다' }, 401)
  }
}

// ==================== 관리자 API 엔드포인트 ====================

// 관리자 로그인 API
app.post('/admin/api/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    const db = c.env.DB
    
    // 관리자 정보 조회 (is_active 필드 제거)
    const admin = await db.prepare(
      'SELECT * FROM admins WHERE username = ?'
    ).bind(username).first()
    
    if (!admin) {
      return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다' }, 401)
    }
    
    // 비밀번호 검증 (평문 비교)
    if (admin.password_hash !== password) {
      return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다' }, 401)
    }
    
    // JWT 토큰 생성 (role 필드 제거)
    const token = await sign(
      {
        id: admin.id,
        username: admin.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24시간
      },
      JWT_SECRET,
      'HS256'
    )
    
    return c.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: '로그인 처리 중 오류가 발생했습니다' }, 500)
  }
})

// 활동소식 목록 조회 API (관리자용)
app.get('/admin/api/activities', adminAuth, async (c) => {
  try {
    const db = c.env.DB
    const { results } = await db.prepare(
      'SELECT * FROM articles ORDER BY date DESC, created_at DESC'
    ).all()
    
    return c.json({ success: true, data: results })
  } catch (error) {
    console.error('Get activities error:', error)
    return c.json({ error: '활동소식 조회 중 오류가 발생했습니다' }, 500)
  }
})

// 활동소식 추가 API
app.post('/admin/api/activities', adminAuth, async (c) => {
  try {
    const { date, title, idxno } = await c.req.json()
    const db = c.env.DB
    
    // 유효성 검사
    if (!date || !title || !idxno) {
      return c.json({ error: '필수 항목을 모두 입력해주세요' }, 400)
    }
    
    // 링크 생성
    const link = `https://www.lecturernews.com/news/articleView.html?idxno=${idxno}`
    const source = '한국강사신문'
    
    // DB에 삽입
    await db.prepare(
      'INSERT INTO articles (date, title, link, source, created_at) VALUES (?, ?, ?, ?, datetime("now"))'
    ).bind(date, title, link, source).run()
    
    return c.json({ success: true, message: '활동소식이 추가되었습니다' })
  } catch (error) {
    console.error('Add activity error:', error)
    return c.json({ error: '활동소식 추가 중 오류가 발생했습니다' }, 500)
  }
})

// 활동소식 수정 API
app.put('/admin/api/activities/:id', adminAuth, async (c) => {
  try {
    const id = c.req.param('id')
    const { date, title, idxno } = await c.req.json()
    const db = c.env.DB
    
    // 유효성 검사
    if (!date || !title || !idxno) {
      return c.json({ error: '필수 항목을 모두 입력해주세요' }, 400)
    }
    
    // 링크 생성
    const link = `https://www.lecturernews.com/news/articleView.html?idxno=${idxno}`
    
    // DB 업데이트
    await db.prepare(
      'UPDATE articles SET date = ?, title = ?, link = ? WHERE id = ?'
    ).bind(date, title, link, id).run()
    
    return c.json({ success: true, message: '활동소식이 수정되었습니다' })
  } catch (error) {
    console.error('Update activity error:', error)
    return c.json({ error: '활동소식 수정 중 오류가 발생했습니다' }, 500)
  }
})

// 활동소식 삭제 API
app.delete('/admin/api/activities/:id', adminAuth, async (c) => {
  try {
    const id = c.req.param('id')
    const db = c.env.DB
    
    // DB에서 삭제
    await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: '활동소식이 삭제되었습니다' })
  } catch (error) {
    console.error('Delete activity error:', error)
    return c.json({ error: '활동소식 삭제 중 오류가 발생했습니다' }, 500)
  }
})

// ============================================
// Popup API Route
// ============================================
app.get('/api/popup-notice', async (c) => {
  try {
    const db = c.env.DB
    const today = new Date().toISOString().split('T')[0]
    
    // 현재 표시할 팝업 공지사항 조회
    const result = await db.prepare(`
      SELECT id, title, content, popup_image_url, popup_start_date, popup_end_date
      FROM notices
      WHERE is_popup = 1
        AND is_published = 1
        AND popup_start_date <= ?
        AND popup_end_date >= ?
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(today, today).all()
    
    if (result.results && result.results.length > 0) {
      return c.json({ success: true, notice: result.results[0] })
    }
    
    return c.json({ success: false, notice: null })
  } catch (error) {
    console.error('팝업 조회 오류:', error)
    return c.json({ success: false, error: '팝업 조회 실패' }, 500)
  }
})

// ============================================
// RSS Feed Routes
// ============================================

// RSS Helper Functions
function escapeXml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatRFC822Date(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toUTCString()
}

// 전체 RSS Feed (활동소식)
app.get('/rss.xml', async (c) => {
  try {
    const db = c.env.DB
    
    // 최신 활동소식 20개 가져오기
    const result = await db.prepare(`
      SELECT id, date, title, link, created_at
      FROM articles
      ORDER BY date DESC, created_at DESC
      LIMIT 20
    `).all()
    
    const items = result.results || []
    const buildDate = new Date().toUTCString()
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>한국미래인재교육협회 - 활동소식</title>
    <link>https://kfea.ai.kr</link>
    <description>한국미래인재교육협회의 최신 활동소식, 공지사항, 교육소식을 전해드립니다.</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://kfea.ai.kr/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://www.genspark.ai/api/files/s/Jier95KY</url>
      <title>한국미래인재교육협회</title>
      <link>https://kfea.ai.kr</link>
    </image>
${items.map((item: any) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.link)}</guid>
      <pubDate>${formatRFC822Date(item.date)}</pubDate>
      <description>${escapeXml(item.title)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`
    
    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('RSS generation error:', error)
    return c.text('RSS Feed generation error', 500)
  }
})

// 공지사항 RSS Feed
app.get('/rss/notice.xml', async (c) => {
  try {
    const db = c.env.DB
    
    // 최신 공지사항 20개 가져오기
    const result = await db.prepare(`
      SELECT id, title, content, is_popup, created_at
      FROM notices
      ORDER BY created_at DESC
      LIMIT 20
    `).all()
    
    const items = result.results || []
    const buildDate = new Date().toUTCString()
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>한국미래인재교육협회 - 공지사항</title>
    <link>https://kfea.ai.kr/boards/notice</link>
    <description>한국미래인재교육협회의 최신 공지사항을 전해드립니다.</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://kfea.ai.kr/rss/notice.xml" rel="self" type="application/rss+xml"/>
${items.map((item: any) => `    <item>
      <title>${item.is_popup ? '[중요] ' : ''}${escapeXml(item.title)}</title>
      <link>https://kfea.ai.kr/boards/notice/${item.id}</link>
      <guid>https://kfea.ai.kr/boards/notice/${item.id}</guid>
      <pubDate>${formatRFC822Date(item.created_at)}</pubDate>
      <description>${escapeXml(item.content || item.title)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`
    
    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Notice RSS generation error:', error)
    return c.text('RSS Feed generation error', 500)
  }
})

// 교육소식 RSS Feed
app.get('/rss/education.xml', async (c) => {
  try {
    const db = c.env.DB
    
    // 최신 교육소식 20개 가져오기
    const result = await db.prepare(`
      SELECT id, title, content, thumbnail_url, created_at
      FROM education_news
      ORDER BY created_at DESC
      LIMIT 20
    `).all()
    
    const items = result.results || []
    const buildDate = new Date().toUTCString()
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>한국미래인재교육협회 - 교육소식</title>
    <link>https://kfea.ai.kr/activities</link>
    <description>한국미래인재교육협회의 최신 교육 프로그램 및 교육소식을 전해드립니다.</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://kfea.ai.kr/rss/education.xml" rel="self" type="application/rss+xml"/>
${items.map((item: any) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>https://kfea.ai.kr/activities#education-${item.id}</link>
      <guid>https://kfea.ai.kr/activities#education-${item.id}</guid>
      <pubDate>${formatRFC822Date(item.created_at)}</pubDate>
      <description>${escapeXml(item.content || item.title)}</description>${item.thumbnail_url ? `
      <media:thumbnail url="${escapeXml(item.thumbnail_url)}"/>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`
    
    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Education RSS generation error:', error)
    return c.text('RSS Feed generation error', 500)
  }
})

// 보도기사 RSS Feed (활동소식과 동일)
app.get('/rss/press.xml', async (c) => {
  try {
    const db = c.env.DB
    
    // 최신 활동소식(보도기사) 20개 가져오기
    const result = await db.prepare(`
      SELECT id, date, title, link, created_at
      FROM articles
      ORDER BY date DESC, created_at DESC
      LIMIT 20
    `).all()
    
    const items = result.results || []
    const buildDate = new Date().toUTCString()
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>한국미래인재교육협회 - 보도기사</title>
    <link>https://kfea.ai.kr/activities</link>
    <description>한국미래인재교육협회 관련 언론 보도 및 보도자료를 전해드립니다.</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://kfea.ai.kr/rss/press.xml" rel="self" type="application/rss+xml"/>
${items.map((item: any) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.link)}</guid>
      <pubDate>${formatRFC822Date(item.date)}</pubDate>
      <description>${escapeXml(item.title)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`
    
    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Press RSS generation error:', error)
    return c.text('RSS Feed generation error', 500)
  }
})

export default app
