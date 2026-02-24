// 관리자 공지사항 관리 페이지
app.get('/admin/notices', (c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>공지사항 관리 - 한국미래인재교육협회</title>
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
                <a href="/admin/dashboard" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-home w-5"></i>
                  <span class="ml-3">대시보드</span>
                </a>
                <a href="/admin/activities" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-newspaper w-5"></i>
                  <span class="ml-3">활동소식 관리</span>
                </a>
                <a href="/admin/notices" class="flex items-center px-4 py-3 text-gray-700 bg-blue-50 rounded-lg font-medium">
                  <i class="fas fa-bullhorn w-5"></i>
                  <span class="ml-3">공지사항 관리</span>
                </a>
                <a href="/admin/resources" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <i class="fas fa-folder-open w-5"></i>
                  <span class="ml-3">자료실 관리</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* 메인 컨텐츠 */}
          <main class="flex-1 p-8">
            <div class="max-w-6xl mx-auto">
              <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-900">공지사항 관리</h1>
                <button onclick="showAddForm()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                  <i class="fas fa-plus mr-2"></i>새 공지사항 추가
                </button>
              </div>

              {/* 공지사항 추가/수정 폼 */}
              <div id="add-form" class="hidden mb-6 bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">공지사항 작성</h2>
                <form id="notice-form" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">제목</label>
                    <input type="text" id="notice-title" required
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">내용</label>
                    <textarea id="notice-content" rows="10" required
                              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="notice-popup" class="w-4 h-4 text-blue-600 rounded" />
                    <label for="notice-popup" class="ml-2 text-sm text-gray-700">팝업으로 표시</label>
                  </div>
                  <div class="flex space-x-3">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                      저장
                    </button>
                    <button type="button" onclick="hideAddForm()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">
                      취소
                    </button>
                  </div>
                </form>
              </div>

              {/* 공지사항 목록 */}
              <div id="notices-list" class="space-y-3">
                <div class="text-center py-8">
                  <i class="fas fa-spinner fa-spin text-3xl text-gray-400 mb-2"></i>
                  <p class="text-gray-500">불러오는 중...</p>
                </div>
              </div>
            </div>
          </main>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          const token = localStorage.getItem('admin_token');
          if (!token) window.location.href = '/admin/login';
          
          let notices = [];
          let editingId = null;
          
          loadNotices();
          
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
            document.getElementById('notice-form').reset();
          }
          
          function hideAddForm() {
            editingId = null;
            document.getElementById('add-form').classList.add('hidden');
            document.getElementById('notice-form').reset();
          }
          
          async function loadNotices() {
            try {
              const response = await fetch('/admin/api/notices', {
                headers: { 'Authorization': 'Bearer ' + token }
              });
              
              if (!response.ok) throw new Error('Failed to load notices');
              
              const data = await response.json();
              notices = data.data || [];
              renderNotices();
            } catch (error) {
              console.error('Load error:', error);
              document.getElementById('notices-list').innerHTML = 
                '<div class="text-center py-8 text-red-500"><i class="fas fa-exclamation-circle text-4xl mb-4"></i><p>공지사항을 불러오는데 실패했습니다.</p></div>';
            }
          }
          
          function renderNotices() {
            const listDiv = document.getElementById('notices-list');
            
            if (notices.length === 0) {
              listDiv.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-inbox text-4xl mb-4"></i><p>등록된 공지사항이 없습니다.</p></div>';
              return;
            }
            
            listDiv.innerHTML = notices.map(function(notice) {
              return '<div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">' +
                '<div class="flex justify-between items-start">' +
                  '<div class="flex-1">' +
                    '<div class="flex items-center mb-2">' +
                      (notice.is_popup ? '<span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mr-2">팝업</span>' : '') +
                      '<span class="text-sm text-gray-500">' + new Date(notice.created_at).toLocaleDateString('ko-KR') + '</span>' +
                    '</div>' +
                    '<h3 class="font-medium text-gray-900 mb-1">' + notice.title + '</h3>' +
                    '<p class="text-sm text-gray-600">' + (notice.content.substring(0, 100) + '...') + '</p>' +
                  '</div>' +
                  '<div class="ml-4 flex space-x-2">' +
                    '<button onclick="editNotice(' + notice.id + ')" class="text-gray-400 hover:text-blue-600 p-2"><i class="fas fa-edit"></i></button>' +
                    '<button onclick="deleteNotice(' + notice.id + ')" class="text-gray-400 hover:text-red-600 p-2"><i class="fas fa-trash"></i></button>' +
                  '</div>' +
                '</div>' +
              '</div>';
            }).join('');
          }
          
          document.getElementById('notice-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const title = document.getElementById('notice-title').value;
            const content = document.getElementById('notice-content').value;
            const is_popup = document.getElementById('notice-popup').checked ? 1 : 0;
            
            if (!title || !content) {
              alert('모든 항목을 입력해주세요.');
              return;
            }
            
            try {
              const url = editingId ? '/admin/api/notices/' + editingId : '/admin/api/notices';
              const method = editingId ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method: method,
                headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, content: content, is_popup: is_popup })
              });
              
              const data = await response.json();
              
              if (data.success) {
                alert(data.message);
                hideAddForm();
                loadNotices();
              } else {
                alert(data.error || '처리 중 오류가 발생했습니다.');
              }
            } catch (error) {
              console.error('Submit error:', error);
              alert('서버 오류가 발생했습니다.');
            }
          });
          
          function editNotice(id) {
            const notice = notices.find(function(n) { return n.id === id; });
            if (!notice) return;
            
            editingId = id;
            document.getElementById('notice-title').value = notice.title;
            document.getElementById('notice-content').value = notice.content;
            document.getElementById('notice-popup').checked = notice.is_popup === 1;
            document.getElementById('add-form').classList.remove('hidden');
          }
          
          async function deleteNotice(id) {
            if (!confirm('정말 삭제하시겠습니까?')) return;
            
            try {
              const response = await fetch('/admin/api/notices/' + id, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + token }
              });
              
              const data = await response.json();
              
              if (data.success) {
                alert(data.message);
                loadNotices();
              } else {
                alert(data.error || '삭제 중 오류가 발생했습니다.');
              }
            } catch (error) {
              console.error('Delete error:', error);
              alert('서버 오류가 발생했습니다.');
            }
          }
        `}} />
      </body>
    </html>
  )
})
