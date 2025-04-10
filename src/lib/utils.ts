// キャッシュバスティング用のURLパラメータを追加する関数
export function addCacheBuster(url: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${Date.now()}`;
}

// 使用例:
// <a href={addCacheBuster('/pricing')}>料金ページ</a> 