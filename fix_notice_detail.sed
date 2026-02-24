/^              {\/\* 포스터 이미지 \*\/}$/,/^              {\/\* 목록 버튼 \*\/}$/{
  /^              {\/\* 포스터 이미지 \*\/}$/c\
              {/* 본문 내용 */}\
              <div class="px-8 py-8">\
                <div class="prose max-w-none">\
                  <div \
                    class="text-gray-800 leading-relaxed whitespace-pre-wrap text-base"\
                    dangerouslySetInnerHTML={{ __html: notice.content.replace(/\\n/g, '<br/>') }}\
                  />\
                </div>\
              </div>\

  /^              {\/\* 목록 버튼 \*\/}$/!d
}
