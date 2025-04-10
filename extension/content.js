// コンテンツスクリプト - noteページ内のテキスト選択を処理

// 現在選択されているテキストを取得する関数
function getSelectedText() {
  return window.getSelection().toString();
}

// 拡張機能からのメッセージリスナー
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getSelectedText") {
    sendResponse({selectedText: getSelectedText()});
  }
});

// テキスト選択を検出
document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0) {
    // 選択テキストの情報を保存
    chrome.runtime.sendMessage({
      action: 'textSelected',
      data: {
        text: selectedText,
        url: window.location.href,
        title: document.title,
        sourceType: 'note',
        timestamp: new Date().toISOString()
      }
    });
  }
});

console.log('note with Notion: コンテンツスクリプトが読み込まれました');

// noteの著者情報を抽出する関数
function extractNoteAuthorInfo() {
  // 著者情報が含まれる要素を探索（実際のDOMに合わせて調整が必要）
  const authorElement = document.querySelector('.o-noteContentHeader__name');
  if (authorElement) {
    return authorElement.textContent.trim();
  }
  return null;
}

// noteの記事タイトルを抽出する関数
function extractNoteTitle() {
  // タイトル要素を探索（実際のDOMに合わせて調整が必要）
  const titleElement = document.querySelector('.o-noteContentHeader__title');
  if (titleElement) {
    return titleElement.textContent.trim();
  }
  return document.title; // フォールバックとしてページタイトルを使用
} 