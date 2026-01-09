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
                        <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>대구 지역본부
                      </a>
                      <a href="/daejeon-branch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>대전 지역본부
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
              <div class="text-5xl font-bold mb-2">6</div>
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
                  <p class="text-gray-600">info@kfea.ai.kr</p>
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
                <a href="https://www.youtube.com/@KFEA" target="_blank" rel="noopener noreferrer"
                   class="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  <i class="fab fa-youtube"></i>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// About page - 협회 개요
app.get('/about', (c) => {
  return c.html(
    <Layout title="협회 개요 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">협회 개요</h1>
            <p class="text-xl text-gray-600">미래를 준비하는 인재양성을 위한 전문 교육기관</p>
          </div>

          <div class="space-y-12">
            {/* 설립 목적 */}
            <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-lightbulb text-amber-500 mr-4"></i>
                설립 목적
              </h2>
              <p class="text-lg text-gray-700 leading-relaxed">
                한국미래인재교육협회는 급변하는 교육 환경과 4차 산업혁명 시대에 대응하여, 
                미래 사회가 요구하는 창의적이고 전문적인 인재 양성을 목표로 설립되었습니다. 
                늘봄방과후 전문강사 양성, AI 활용 교육, 취업 지원 프로그램 등을 통해 
                교육의 질적 향상과 사회적 가치 실현에 기여하고 있습니다.
              </p>
            </div>

            {/* 비전과 미션 */}
            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 md:p-10 text-white">
                <div class="flex items-center mb-6">
                  <i class="fas fa-eye text-4xl mr-4"></i>
                  <h2 class="text-3xl font-bold">비전</h2>
                </div>
                <p class="text-lg leading-relaxed">
                  미래 교육을 선도하는 대한민국 대표 인재양성 기관으로 성장하여, 
                  교육 현장과 취업 시장의 가교 역할을 수행하며, 
                  지속 가능한 교육 생태계 조성에 앞장섭니다.
                </p>
              </div>

              <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-8 md:p-10 text-white">
                <div class="flex items-center mb-6">
                  <i class="fas fa-flag text-4xl mr-4"></i>
                  <h2 class="text-3xl font-bold">미션</h2>
                </div>
                <p class="text-lg leading-relaxed">
                  전문 교육 프로그램을 통한 실무형 인재 양성, 
                  산학협력 네트워크 구축을 통한 취업 기회 확대, 
                  지속적인 교육 혁신으로 사회적 가치 창출을 실현합니다.
                </p>
              </div>
            </div>

            {/* 핵심 가치 */}
            <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">핵심 가치</h2>
              <div class="grid md:grid-cols-3 gap-8">
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
            <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 class="text-3xl font-bold text-gray-900 mb-8">주요 사업</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">늘봄방과후 전문강사 양성</h3>
                    <p class="text-gray-600">초등학교 방과후 과정 전문 강사 교육</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">AI 활용 교육</h3>
                    <p class="text-gray-600">자기소개서, 면접, 교안 제작 등 실무 AI 교육</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">취업 지원 프로그램</h3>
                    <p class="text-gray-600">PSAT, NCS, GSAT 등 공기업 취업 준비</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i class="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">강사 양성 과정</h3>
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">대표 인사말</h1>
            <p class="text-xl text-gray-600">한국미래인재교육협회를 방문해 주셔서 감사합니다</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="flex flex-col">
              {/* 대표 정보 영역 */}
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white text-center">
                <div class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <i class="fas fa-user text-6xl text-white/80"></i>
                </div>
                <h2 class="text-3xl font-bold mb-2">최유미</h2>
                <p class="text-xl">한국미래인재교육협회 대표</p>
              </div>

              {/* 인사말 내용 */}
              <div class="p-8 md:p-12">
                <div class="prose prose-lg max-w-none">
                  <p class="text-gray-700 leading-relaxed mb-6">
                    안녕하십니까. 한국미래인재교육협회 대표 최유미입니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-6">
                    우리 협회는 급변하는 교육 환경 속에서 미래를 준비하는 인재 양성을 목표로 
                    2020년 설립되었습니다. 그동안 전북대, 경북대, 영남대 등 전국 32개 이상의 
                    교육기관과 협력하여 수많은 전문 인재를 배출해 왔습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-6">
                    특히 늘봄방과후 전문강사 양성과정은 초등학교 방과후 교육의 질적 향상에 
                    크게 기여하고 있으며, AI 활용 교육 프로그램은 4차 산업혁명 시대에 필수적인 
                    디지털 역량 강화에 앞장서고 있습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-6">
                    저희 협회는 단순한 자격증 취득을 넘어, 실무에서 바로 활용할 수 있는 
                    전문성을 갖춘 인재를 양성하는 데 최선을 다하고 있습니다. 
                    대학 재학생부터 경력 단절 여성, 퇴직 준비자까지 누구나 새로운 도전을 
                    시작할 수 있도록 체계적인 교육 프로그램을 제공하고 있습니다.
                  </p>

                  <p class="text-gray-700 leading-relaxed mb-6">
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">조직도</h1>
            <p class="text-xl text-gray-600">한국미래인재교육협회 조직 구성</p>
          </div>

          {/* 대표 */}
          <div class="flex justify-center mb-12">
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-8 text-center min-w-[280px]">
              <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-crown text-3xl"></i>
              </div>
              <h2 class="text-2xl font-bold mb-2">대표</h2>
              <p class="text-xl">최유미</p>
            </div>
          </div>

          {/* 연결선 */}
          <div class="flex justify-center mb-8">
            <div class="w-1 h-12 bg-gray-300"></div>
          </div>

          {/* 본부 전문위원 */}
          <div class="flex justify-center mb-12">
            <div class="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-users text-2xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">본부 전문위원</h3>
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
          <div class="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            {/* 대구 지역본부 */}
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-map-marker-alt text-2xl text-green-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">대구 지역본부</h3>
              </div>
              
              <div class="space-y-4">
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
              
              <div class="space-y-4">
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">교육과정</h1>
            <p class="text-xl text-gray-600">체계적이고 전문적인 교육 프로그램을 만나보세요</p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            {/* 늘봄방과후 전문강사 양성 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-chalkboard-teacher text-3xl"></i>
                  </div>
                  <h2 class="text-2xl font-bold">늘봄방과후<br/>전문강사 양성</h2>
                </div>
              </div>
              <div class="p-8">
                <p class="text-gray-600 mb-6">
                  초등학교 방과후 교육 전문가로 성장할 수 있는 체계적인 교육과정입니다.
                </p>
                <div class="space-y-4">
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
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-8 text-white">
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-robot text-3xl"></i>
                  </div>
                  <h2 class="text-2xl font-bold">AI 활용 교육</h2>
                </div>
              </div>
              <div class="p-8">
                <p class="text-gray-600 mb-6">
                  ChatGPT 등 최신 AI 도구를 활용한 실무 중심 교육 프로그램입니다.
                </p>
                <div class="space-y-4">
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
              <div class="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-briefcase text-3xl"></i>
                  </div>
                  <h2 class="text-2xl font-bold">취업 지원<br/>프로그램</h2>
                </div>
              </div>
              <div class="p-8">
                <p class="text-gray-600 mb-6">
                  공기업 및 대기업 취업을 위한 맞춤형 취업 준비 프로그램입니다.
                </p>
                <div class="space-y-4">
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
              <div class="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-white">
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-graduation-cap text-3xl"></i>
                  </div>
                  <h2 class="text-2xl font-bold">강사 양성 과정</h2>
                </div>
              </div>
              <div class="p-8">
                <p class="text-gray-600 mb-6">
                  전문 강사로 성장할 수 있는 체계적인 코칭 프로그램입니다.
                </p>
                <div class="space-y-4">
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
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-12 text-white">
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

// Activities page - 활동 소식
app.get('/activities', (c) => {
  return c.html(
    <Layout title="활동 소식 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">활동 소식</h1>
            <p class="text-xl text-gray-600">한국미래인재교육협회의 주요 활동을 소개합니다</p>
          </div>

          <div class="space-y-8">
            {/* 활동 1 */}
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div class="md:flex">
                <div class="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 p-12 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-university text-6xl mb-4"></i>
                    <p class="text-2xl font-bold">대학 출강</p>
                  </div>
                </div>
                <div class="md:w-2/3 p-8 md:p-12">
                  <div class="flex items-center text-gray-500 text-sm mb-3">
                    <i class="fas fa-calendar mr-2"></i>
                    <span>2024년 하반기</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">전북대학교 AI 활용 강사양성 과정</h3>
                  <p class="text-gray-600 mb-4 leading-relaxed">
                    전북대학교 재학생 및 지역 주민을 대상으로 AI 활용 교육 프로그램을 진행하였습니다. 
                    ChatGPT를 활용한 자기소개서 작성, 면접 준비, 교안 제작 등 실무 중심의 교육으로 
                    참가자들의 높은 만족도를 얻었습니다.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">#AI교육</span>
                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">#강사양성</span>
                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">#전북대</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 활동 2 */}
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div class="md:flex">
                <div class="md:w-1/3 bg-gradient-to-br from-green-500 to-green-600 p-12 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-briefcase text-6xl mb-4"></i>
                    <p class="text-2xl font-bold">취업 지원</p>
                  </div>
                </div>
                <div class="md:w-2/3 p-8 md:p-12">
                  <div class="flex items-center text-gray-500 text-sm mb-3">
                    <i class="fas fa-calendar mr-2"></i>
                    <span>2024년 9월</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">경북대학교 취업 지원 프로그램</h3>
                  <p class="text-gray-600 mb-4 leading-relaxed">
                    경북대학교 학생들을 대상으로 공기업 및 대기업 취업 준비를 위한 맞춤형 프로그램을 운영하였습니다. 
                    PSAT, NCS, GSAT 등 각종 적성검사 대비와 함께 1:1 면접 코칭을 제공하여 
                    실제 취업 성공률을 크게 높였습니다.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">#취업지원</span>
                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">#공기업</span>
                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">#경북대</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 활동 3 */}
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div class="md:flex">
                <div class="md:w-1/3 bg-gradient-to-br from-purple-500 to-purple-600 p-12 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-train text-6xl mb-4"></i>
                    <p class="text-2xl font-bold">기업 연수</p>
                  </div>
                </div>
                <div class="md:w-2/3 p-8 md:p-12">
                  <div class="flex items-center text-gray-500 text-sm mb-3">
                    <i class="fas fa-calendar mr-2"></i>
                    <span>2024년 8월</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">한국철도공사 직무교육</h3>
                  <p class="text-gray-600 mb-4 leading-relaxed">
                    한국철도공사 임직원을 대상으로 AI 활용 및 업무 혁신 교육을 진행하였습니다. 
                    실무에 바로 적용할 수 있는 AI 도구 활용법과 디지털 전환 전략을 교육하여 
                    업무 효율성 향상에 기여하였습니다.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">#기업연수</span>
                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">#직무교육</span>
                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">#코레일</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 협력기관 현황 */}
          <div class="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-12 text-white">
            <h2 class="text-3xl font-bold mb-8 text-center">협력기관 현황</h2>
            <div class="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div class="text-5xl font-bold mb-2">32+</div>
                <p class="text-xl">협력 기관</p>
              </div>
              <div>
                <div class="text-5xl font-bold mb-2">100+</div>
                <p class="text-xl">강의 진행</p>
              </div>
              <div>
                <div class="text-5xl font-bold mb-2">500+</div>
                <p class="text-xl">수료생</p>
              </div>
              <div>
                <div class="text-5xl font-bold mb-2">6</div>
                <p class="text-xl">민간자격증</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Programs/Certifications page - 민간자격증 과정
app.get('/programs/certifications', (c) => {
  return c.html(
    <Layout title="민간자격증 과정 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">민간자격증 과정</h1>
            <p class="text-xl text-gray-600">한국미래인재교육협회에서 발급하는 공식 민간자격증</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* 스피치지도사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-microphone text-3xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-center">스피치지도사</h3>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">
                  효과적인 의사소통과 발표 능력 향상을 위한 전문 지도사 자격증
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <p class="text-sm text-gray-700">음성 및 발음 교정 기법</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <p class="text-sm text-gray-700">프레젠테이션 스킬 향상</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                    <p class="text-sm text-gray-700">커뮤니케이션 전문가 양성</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 늘봄방과후프로그램강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-child text-3xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-center">늘봄방과후프로그램강사</h3>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">
                  초등학교 방과후 프로그램 전문 강사 자격증
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <p class="text-sm text-gray-700">아동 발달심리 이해</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <p class="text-sm text-gray-700">방과후 교육 프로그램 설계</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <p class="text-sm text-gray-700">학급 운영 및 관리 능력</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 취업진로디렉터 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-briefcase text-3xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-center">취업진로디렉터</h3>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">
                  취업 및 진로 지도 전문가 자격증
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <p class="text-sm text-gray-700">진로 상담 및 컨설팅</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <p class="text-sm text-gray-700">취업 전략 수립 및 지도</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-purple-500 mt-1"></i>
                    <p class="text-sm text-gray-700">면접 및 자소서 코칭</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 기후위기대응교육강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-leaf text-3xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-center">기후위기대응교육강사</h3>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">
                  기후변화 대응 교육 전문 강사 자격증
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <p class="text-sm text-gray-700">기후위기 이해 및 교육</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <p class="text-sm text-gray-700">환경보호 실천 방법 지도</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <p class="text-sm text-gray-700">지속가능발전 교육</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 제로웨이스트실천교육강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-recycle text-3xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-center">제로웨이스트실천교육강사</h3>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">
                  제로웨이스트 실천 교육 전문가 자격증
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-teal-500 mt-1"></i>
                    <p class="text-sm text-gray-700">쓰레기 줄이기 실천 교육</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-teal-500 mt-1"></i>
                    <p class="text-sm text-gray-700">재활용 및 업사이클링</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-teal-500 mt-1"></i>
                    <p class="text-sm text-gray-700">친환경 라이프스타일 지도</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 시니어라이프코칭강사 */}
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-hands-helping text-3xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-center">시니어라이프코칭강사</h3>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">
                  시니어 대상 라이프 코칭 전문가 자격증
                </p>
                <div class="space-y-3">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <p class="text-sm text-gray-700">시니어 심리 이해</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <p class="text-sm text-gray-700">노후 생활 설계 코칭</p>
                  </div>
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-amber-500 mt-1"></i>
                    <p class="text-sm text-gray-700">건강한 노년 생활 지원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 문의 섹션 */}
          <div class="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-12 text-white text-center">
            <h2 class="text-3xl font-bold mb-4">자격증 취득 문의</h2>
            <p class="text-xl mb-8">전문 자격증 취득으로 새로운 경력을 시작하세요</p>
            <div class="flex flex-wrap justify-center gap-4">
              <a href="/contact" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
                문의하기
              </a>
              <a href="/programs" class="bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                교육과정 보기
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// Seoul Branch page - 서울지부
app.get('/seoul-branch', (c) => {
  return c.html(
    <Layout title="서울지부 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">서울지부 (본부)</h1>
            <p class="text-xl text-gray-600">한국미래인재교육협회 본부</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">본부 정보</h2>
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-user-tie text-blue-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">본부장</p>
                      <p class="text-gray-600">김민수</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-map-marker-alt text-blue-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">주소</p>
                      <p class="text-gray-600">서울특별시 강남구 논현로10길 30 505-62호</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-phone text-blue-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">전화</p>
                      <p class="text-gray-600">0507-1426-1547</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-envelope text-blue-600 text-xl mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-900">이메일</p>
                      <p class="text-gray-600">info@kfea.ai.kr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">전문위원</h2>
                <div class="space-y-3">
                  <div class="bg-blue-50 rounded-lg p-4">
                    <p class="font-semibold text-gray-900">김대원 (진로/취업 컨설팅)</p>
                    <p class="text-sm text-gray-600">한국기술교육대학교 박사과정 수료</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-4">
                    <p class="font-semibold text-gray-900">강은지 (자기주도학습)</p>
                    <p class="text-sm text-gray-600">페이머스유 이미지메이킹센터 대표</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-4">
                    <p class="font-semibold text-gray-900">정수연 (취업지원)</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-4">
                    <p class="font-semibold text-gray-900">강동현 (AI교육)</p>
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

// Daegu Branch page - 대구 지역본부
app.get('/daegu-branch', (c) => {
  return c.html(
    <Layout title="대구 지역본부 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">대구 지역본부</h1>
            <p class="text-xl text-gray-600">영남권 교육 거점</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">본부 정보</h2>
                <div class="space-y-4">
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
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-green-600"></i>
                    <p class="text-gray-700">경북대학교</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-green-600"></i>
                    <p class="text-gray-700">영남대학교</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-green-600"></i>
                    <p class="text-gray-700">대구대학교</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-green-600"></i>
                    <p class="text-gray-700">계명대학교</p>
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">대전 지역본부</h1>
            <p class="text-xl text-gray-600">충청권 교육 거점</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">본부 정보</h2>
                <div class="space-y-4">
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
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-purple-600"></i>
                    <p class="text-gray-700">한국기술교육대학교</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-purple-600"></i>
                    <p class="text-gray-700">배재대학교</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-university text-purple-600"></i>
                    <p class="text-gray-700">나사렛대학교</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-building text-purple-600"></i>
                    <p class="text-gray-700">한국철도공사</p>
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-white rounded-2xl shadow-xl p-12">
            <i class="fas fa-chalkboard-teacher text-6xl text-blue-600 mb-6"></i>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">온라인 강의실</h1>
            <p class="text-xl text-gray-600 mb-8">
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
app.get('/boards/notice', (c) => {
  return c.html(
    <Layout title="공지사항 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-12">공지사항</h1>
          
          <div class="space-y-4">
            <div class="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div class="flex items-center mb-2">
                <span class="bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded mr-3">중요</span>
                <span class="text-gray-500 text-sm">2025.12.08</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">2025년 겨울방학 늘봄방과후 전문강사 특별과정 모집</h3>
              <p class="text-gray-600">2025학년도 신학기 대비 늘봄방과후 전문강사 양성과정을 개설합니다...</p>
            </div>

            <div class="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div class="flex items-center mb-2">
                <span class="bg-slate-600 text-white px-3 py-1 text-xs font-semibold rounded mr-3">교육</span>
                <span class="text-gray-500 text-sm">2025.12.05</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">2026학년도 대입 AI 면접 대비 특강 개최</h3>
              <p class="text-gray-600">최신 AI 면접 트렌드 분석과 실전 연습을 통해 대입 면접을 완벽하게 준비하세요...</p>
            </div>

            <div class="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div class="flex items-center mb-2">
                <span class="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded mr-3">신규</span>
                <span class="text-gray-500 text-sm">2025.12.01</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">온라인 강의실 시스템 업그레이드 완료</h3>
              <p class="text-gray-600">더욱 편리해진 학습 관리 시스템으로 언제 어디서나 수준 높은 교육을 받으실 수 있습니다...</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
})

// News Board - 보도기사
app.get('/boards/news', (c) => {
  return c.html(
    <Layout title="보도기사 - 한국미래인재교육협회">
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-12">보도기사</h1>
          
          <div class="bg-white rounded-lg p-12 text-center">
            <i class="fas fa-newspaper text-5xl text-gray-400 mb-4"></i>
            <p class="text-xl text-gray-600">준비 중입니다.</p>
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-12">Q&A</h1>
          
          <div class="bg-white rounded-lg p-12 text-center">
            <i class="fas fa-question-circle text-5xl text-gray-400 mb-4"></i>
            <p class="text-xl text-gray-600 mb-4">궁금한 점이 있으신가요?</p>
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
      <section class="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-12">갤러리</h1>
          
          <div class="bg-white rounded-lg p-12 text-center">
            <i class="fas fa-images text-5xl text-gray-400 mb-4"></i>
            <p class="text-xl text-gray-600">준비 중입니다.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
})

export default app
