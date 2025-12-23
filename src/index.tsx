import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

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
      <body class="min-h-screen bg-gray-50">
        <div>
          {/* Header with improved navigation spacing */}
          <header class="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center h-20">
                {/* Logo */}
                <div class="flex items-center">
                  <a href="/" class="flex items-center space-x-3 group">
                    <div class="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors duration-200">
                      <i class="fas fa-graduation-cap text-white text-xl"></i>
                    </div>
                    <div>
                      <div class="text-xl font-bold text-gray-900">한국미래인재교육협회</div>
                      <div class="text-xs text-gray-500">Korea Future Education Association</div>
                    </div>
                  </a>
                </div>

                {/* Desktop Navigation - IMPROVED SPACING */}
                <nav class="hidden lg:flex items-center space-x-8">
                  <a href="/" class="px-5 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-900 text-white">
                    홈
                  </a>
                  
                  {/* 협회소개 Dropdown */}
                  <div class="relative group">
                    <button class="px-5 py-2 rounded-lg font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100">
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
                    <button class="px-5 py-2 rounded-lg font-medium transition-all duration-200 flex items-center text-gray-700 hover:bg-gray-100">
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
                  
                  <a href="/activities" class="px-5 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100">
                    활동 소식
                  </a>
                  
                  {/* 지부안내 Dropdown */}
                  <div class="relative group">
                    <button class="px-5 py-2 font-medium text-gray-700 hover:text-blue-900 flex items-center">
                      지부안내
                    </button>
                    <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border border-gray-200">
                      <a href="/seoul-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>서울지부
                      </a>
                      <a href="/daegu-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>대구지부
                      </a>
                      <a href="/daejeon-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>대전지부
                      </a>
                    </div>
                  </div>
                  
                  {/* 게시판 Dropdown */}
                  <div class="relative group">
                    <button class="px-5 py-2 font-medium text-gray-700 hover:text-blue-900 flex items-center">
                      게시판
                    </button>
                    <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border border-gray-200">
                      <a href="/boards/notice" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-bullhorn mr-2 text-blue-700"></i>공지사항
                      </a>
                      <a href="/boards/news" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-newspaper mr-2 text-blue-700"></i>보도기사
                      </a>
                      <a href="/boards/qna" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-question-circle mr-2 text-blue-700"></i>Q&A
                      </a>
                      <a href="/boards/gallery" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-images mr-2 text-blue-700"></i>갤러리
                      </a>
                    </div>
                  </div>
                  
                  <a href="/classroom" class="px-5 py-2 font-medium text-gray-700 hover:text-blue-900">
                    강의실
                  </a>
                  
                  {/* 로그인 Dropdown */}
                  <div class="relative group" id="login-menu">
                    <button class="px-5 py-2 font-medium text-gray-700 hover:text-blue-900 flex items-center" id="login-button">
                      로그인
                    </button>
                    <div class="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10 min-w-56 border" id="login-dropdown">
                      {/* Dynamic content */}
                    </div>
                  </div>
                  
                  <a href="/contact" class="px-5 py-2 font-medium text-gray-700 hover:text-blue-900">
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
                    <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>서울지부
                  </a>
                  <a href="/daegu-branch" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>대구지부
                  </a>
                  <a href="/daejeon-branch" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>대전지부
                  </a>
                </div>

                <div class="border-t pt-2">
                  <div class="px-4 py-2 text-sm font-semibold text-gray-500">게시판</div>
                  <a href="/boards/notice" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-bullhorn mr-2"></i>공지사항
                  </a>
                  <a href="/boards/news" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-newspaper mr-2"></i>보도기사
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
          <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="grid md:grid-cols-3 gap-8">
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
                      seraphina_ym@naver.com
                    </p>
                  </div>
                </div>

                {/* 빠른 링크 */}
                <div>
                  <h3 class="text-lg font-bold mb-4">빠른 링크</h3>
                  <div class="space-y-2">
                    <a href="/about" class="block text-gray-400 hover:text-white transition-colors">협회 소개</a>
                    <a href="/programs" class="block text-gray-400 hover:text-white transition-colors">교육 프로그램</a>
                    <a href="/activities" class="block text-gray-400 hover:text-white transition-colors">활동 소식</a>
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
                    <a href="https://www.instagram.com/seraphina_ym" target="_blank" rel="noopener noreferrer"
                       class="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors">
                      <i class="fab fa-instagram text-lg"></i>
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
      <section class="relative min-h-[600px] overflow-hidden">
        <div class="absolute inset-0">
          <img 
            src="https://sspark.genspark.ai/cfimages?u1=ZvZIHCIL5oCRMBloZCGcSI12wH6HQo%2BQy3E262NN63PSeDjYijUyQvw4%2BP0b%2F5wv1ohHZIw0tv0Gdh9eGxNZv52UUilUEEWoXMUfwsI0w%2FxGwBCp7BjtaCbkdNaHOn3hRwWS9wHtRMJgzJtzWNkJLJureNKCns8VrcnM%2FTzUykJ0G5eHaS2t7Z5M93BWoJ27adqhIv0Y4rRTw1stExK5UzkwIhB1gBBI%2Bxr5sbw%3D&u2=pMvOfrBWuG9ugY%2Fh&width=2560" 
            alt="Professional Business Team Collaboration" 
            class="w-full h-full object-cover" 
          />
          <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/70 to-blue-900/60"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-24 md:py-32">
          <div>
            <h1 class="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
              한국미래인재교육협회
            </h1>
            <p class="text-xl md:text-3xl mb-6 text-white font-semibold drop-shadow">
              미래 사회를 이끌어갈 창의적이고 전문적인 인재 양성
            </p>
            <p class="text-lg md:text-xl mb-10 text-white/90 drop-shadow">
              4차 산업혁명 시대에 맞춘 체계적이고 전문적인 교육 프로그램
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/programs" class="group relative bg-white hover:bg-gray-100 text-blue-900 px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-200 shadow-lg inline-flex items-center">
                <span>교육과정 보기</span>
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a href="/contact" class="group relative bg-transparent hover:bg-white/10 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-200 border-2 border-white inline-flex items-center backdrop-blur-sm">
                <i class="fas fa-phone mr-2"></i>
                <span>상담 신청</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section class="py-16 bg-gradient-to-b from-white to-gray-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-block mb-4">
              <span class="bg-blue-100 text-blue-800 px-6 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider">
                Our Programs
              </span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">교육 프로그램</h2>
            <p class="text-lg text-gray-600">다양한 분야의 전문 교육과정을 만나보세요</p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
      <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">공지사항</h2>
              <p class="text-gray-600">최신 소식을 확인하세요</p>
            </div>
            <a href="/notice" class="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              <span>전체보기</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
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
      <section class="py-16 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4">주요 출강 및 협력 기관</h2>
            <p class="text-xl text-gray-600">신뢰할 수 있는 기관들과 함께합니다</p>
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
      <section class="py-20 bg-blue-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">협회 통계 및 성과</h2>
            <p class="text-xl text-blue-100">숫자로 보는 한국미래인재교육협회</p>
          </div>

          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">32+</div>
              <div class="text-xl text-blue-100">협력 기관</div>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">3</div>
              <div class="text-xl text-blue-100">민간자격증</div>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">100+</div>
              <div class="text-xl text-blue-100">강의 진행</div>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">500+</div>
              <div class="text-xl text-blue-100">수료생</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">지금 시작하세요</h2>
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

// Contact page
app.get('/contact', (c) => {
  return c.html(
    <Layout title="문의하기 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">문의하기</h1>
            <p class="text-xl text-gray-600">궁금한 점이 있으시면 언제든지 연락주세요</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div class="space-y-8">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-user text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">대표</h3>
                  <p class="text-gray-600">최유미 (한국미래인재교육협회 대표)</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-phone text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">전화번호</h3>
                  <p class="text-gray-600">010-3450-1117</p>
                  <p class="text-sm text-gray-500">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">이메일</h3>
                  <p class="text-gray-600">seraphina_ym@naver.com</p>
                  <p class="text-sm text-gray-500">24시간 접수</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-map-marker-alt text-orange-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">주소</h3>
                  <p class="text-gray-600">서울특별시 강남구 논현로10길 30 505-62호</p>
                </div>
              </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">SNS로 연락하기</h3>
              <div class="flex space-x-4">
                <a href="https://blog.naver.com/aw_yumic" target="_blank" rel="noopener noreferrer"
                   class="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  <i class="fas fa-blog"></i>
                  <span>네이버 블로그</span>
                </a>
                <a href="https://www.instagram.com/seraphina_ym" target="_blank" rel="noopener noreferrer"
                   class="flex items-center space-x-2 bg-pink-50 hover:bg-pink-100 text-pink-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  <i class="fab fa-instagram"></i>
                  <span>인스타그램</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

export default app
