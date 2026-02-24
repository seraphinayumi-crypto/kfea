// 공지사항 관리 API
// 공지사항 목록 조회
app.get('/admin/api/notices', adminAuth, async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(
      'SELECT id, title, content, is_published, is_popup, created_at, views FROM notices ORDER BY created_at DESC'
    ).all()
    
    return c.json({ success: true, data: result.results || [] })
  } catch (error) {
    console.error('Notices list error:', error)
    return c.json({ error: '공지사항 목록 조회 실패' }, 500)
  }
})

// 공지사항 추가
app.post('/admin/api/notices', adminAuth, async (c) => {
  try {
    const db = c.env.DB
    const { title, content, is_popup } = await c.req.json()
    
    if (!title || !content) {
      return c.json({ error: '제목과 내용을 입력해주세요' }, 400)
    }
    
    const admin = c.get('adminUser')
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    
    await db.prepare(
      'INSERT INTO notices (title, content, is_published, is_popup, created_at, created_by, views) VALUES (?, ?, 1, ?, ?, ?, 0)'
    ).bind(title, content, is_popup || 0, created_at, admin.id).run()
    
    return c.json({ success: true, message: '공지사항이 등록되었습니다' })
  } catch (error) {
    console.error('Notice create error:', error)
    return c.json({ error: '공지사항 등록 실패' }, 500)
  }
})

// 공지사항 수정
app.put('/admin/api/notices/:id', adminAuth, async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    const { title, content, is_popup } = await c.req.json()
    
    if (!title || !content) {
      return c.json({ error: '제목과 내용을 입력해주세요' }, 400)
    }
    
    await db.prepare(
      'UPDATE notices SET title = ?, content = ?, is_popup = ? WHERE id = ?'
    ).bind(title, content, is_popup || 0, id).run()
    
    return c.json({ success: true, message: '공지사항이 수정되었습니다' })
  } catch (error) {
    console.error('Notice update error:', error)
    return c.json({ error: '공지사항 수정 실패' }, 500)
  }
})

// 공지사항 삭제
app.delete('/admin/api/notices/:id', adminAuth, async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM notices WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: '공지사항이 삭제되었습니다' })
  } catch (error) {
    console.error('Notice delete error:', error)
    return c.json({ error: '공지사항 삭제 실패' }, 500)
  }
})
