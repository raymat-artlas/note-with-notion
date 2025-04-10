// 拡張機能のメッセージング安定化

// 非同期時のタイムアウト制御を追加
function sendMessageWithTimeout(message, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('メッセージレスポンスのタイムアウト'));
    }, timeout);
    
    chrome.runtime.sendMessage(message, (response) => {
      clearTimeout(timeoutId);
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}

// 拡張のリスナーコードを修正
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 即時レスポンスできる場合はここで返す
  if (message.type === 'ping') {
    sendResponse({ pong: true });
    return false; // 同期レスポンス
  }
  
  // 非同期レスポンスの場合
  // Promise.resolveで包むことで例外が発生しても安全
  Promise.resolve()
    .then(() => {
      // 実際の処理
      // ...
      return { success: true };
    })
    .then(response => {
      try {
        sendResponse(response);
      } catch (e) {
        console.error('送信エラー:', e);
      }
    })
    .catch(err => {
      console.error('処理エラー:', err);
      try {
        sendResponse({ error: err.message });
      } catch (e) {
        console.error('エラーレスポンス送信失敗:', e);
      }
    });
  
  return true; // 非同期レスポンスを示す
}); 