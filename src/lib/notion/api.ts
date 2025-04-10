type NotionHighlight = {
  highlight: string;
  url: string;
  tags?: string[];
  title?: string;
  memo?: string;
};

export async function saveHighlightToNotion(
  notionToken: string,
  databaseId: string,
  data: NotionHighlight
) {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        // タイトルプロパティ（ハイライト）
        'ハイライト': {
          title: [
            {
              text: {
                content: data.highlight
              }
            }
          ]
        },
        // URLプロパティ
        'URL': {
          url: data.url
        },
        // タグプロパティ（マルチセレクト）
        'タグ': {
          multi_select: data.tags?.map(tag => ({ name: tag })) || []
        },
        // 保存日プロパティ
        '保存日': {
          date: {
            start: new Date().toISOString()
          }
        },
        // タイトルプロパティ（テキスト）
        'タイトル': {
          rich_text: [
            {
              text: {
                content: data.title || ''
              }
            }
          ]
        },
        // メモプロパティ（テキスト、プレミアム機能）
        ...(data.memo ? {
          'メモ': {
            rich_text: [
              {
                text: {
                  content: data.memo
                }
              }
            ]
          }
        } : {})
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Notion API Error: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

// NotionデータベースIDを保存する関数
export async function saveNotionDatabaseId(userId: string, databaseId: string) {
  // Firestoreにデータベース情報を保存する処理を実装
} 