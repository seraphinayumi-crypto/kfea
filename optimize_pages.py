import re

# Read the file
with open('src/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. About page - 협회 개요 최적화 (한 페이지에 보이도록)
content = re.sub(
    r'(// About page - 협회 개요.*?<section class="py-12)',
    r'\1',
    content
)
# 섹션 py 줄이기
content = re.sub(
    r'(<section class="py-12 bg-gradient-to-b from-blue-50 to-white">.*?<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">.*?<div class="text-center )mb-10(">)',
    r'\1mb-6\2',
    content
)
# 카드 패딩과 간격 줄이기
content = re.sub(
    r'(<div class="bg-white rounded-2xl shadow-lg )p-6 md:p-8(">)',
    r'\1p-4 md:p-6\2',
    content
)
# space-y-8을 space-y-4로
content = re.sub(
    r'(<div class=")space-y-8(">\s*\{/\* 설립 목적 \*/\})',
    r'\1space-y-4\2',
    content
)
# 핵심 가치 제목 크기 줄이기
content = re.sub(
    r'(<h2 class="text-3xl font-bold text-gray-900 )mb-8( text-center">핵심 가치</h2>)',
    r'<h2 class="text-xl font-bold text-gray-900 mb-4 text-center">핵심 가치</h2>',
    content
)
# 주요 사업 제목 크기 줄이기
content = re.sub(
    r'(<h2 class="text-3xl font-bold text-gray-900 )mb-8(">주요 사업</h2>)',
    r'<h2 class="text-xl font-bold text-gray-900 mb-4">주요 사업</h2>',
    content
)

# 2. President page - 대표 인사말 최적화
# 대표 정보 영역 패딩 줄이기
content = re.sub(
    r'(<div class="bg-gradient-to-r from-blue-500 to-blue-600 )p-8( text-white text-center">)',
    r'\1p-6\2',
    content
)
# 인사말 내용 패딩 줄이기
content = re.sub(
    r'(<div class="p-6 )md:p-8(">.*?<div class="prose prose-lg max-w-none">)',
    r'\1md:p-6\2',
    content, flags=re.DOTALL
)
# 문단 간격 줄이기
content = re.sub(
    r'(<p class="text-gray-700 leading-relaxed )mb-6(">)',
    r'\1mb-4\2',
    content
)

# 3. Programs page - 교육과정 최적화
# 그리드 갭 줄이기
content = re.sub(
    r'(<div class="grid md:grid-cols-2 )gap-6(">.*?\{/\* 늘봄방과후 전문강사 양성 \*/\})',
    r'\1gap-4\2',
    content
)
# 카드 헤더 패딩 줄이기
content = re.sub(
    r'(<div class="bg-gradient-to-r from-(?:blue|purple|green)-500 to-(?:blue|purple|green)-600 )p-8( text-white">)',
    r'\1p-6\2',
    content
)
# 카드 내용 패딩 줄이기
content = re.sub(
    r'(<div class="p-8">.*?<p class="text-gray-600 )mb-6(">)',
    r'<div class="p-6">\n                <p class="text-gray-600 mb-4">',
    content
)
# space-y-3을 space-y-2로
content = re.sub(
    r'(<div class=")space-y-3(">\s*<div class="flex items-start space-x-3">)',
    r'\1space-y-2\2',
    content
)

# 4. Contact page - 문의하기 최적화
# 섹션 py 줄이기 (py-12 to py-8)
content = re.sub(
    r'(// Contact page with form.*?<section class=")py-12( bg-gradient-to-b from-blue-50 to-white">)',
    r'\1py-8\2',
    content
)
# 제목 mb 줄이기
content = re.sub(
    r'(<div class="text-center )mb-8(">.*?<h1 class="text-3xl md:text-3xl font-bold text-gray-900 )mb-4(">문의하기</h1>)',
    r'\1mb-6\2mb-3\4',
    content
)
# 카드 패딩 줄이기
content = re.sub(
    r'(<div class="bg-white rounded-2xl shadow-xl )p-8(">.*?<h2 class="text-2xl font-bold text-gray-900 )mb-6(',
    r'\1p-6\2mb-4\4',
    content
)
# space-y-6을 space-y-4로
content = re.sub(
    r'(<div class=")space-y-6(">\s*<div class="flex items-start space-x-4">.*?<i class="fas fa-user text-blue-600)',
    r'\1space-y-4\2',
    content
)
# 폼 space-y-3을 space-y-2로
content = re.sub(
    r'(<form id="contactForm" class=")space-y-3(">)',
    r'\1space-y-2\2',
    content
)

# Save
with open('src/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ 4개 페이지 최적화 완료 (한 페이지에 보이도록 조정)')
