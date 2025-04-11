export const PLANS = {
  FREE: 'free',
  MONTHLY: 'monthly',
  ANNUAL: 'annual',
};

export interface PlanFeature {
  name: string;
  description: string;
  included: boolean;
}

export const planFeatures: Record<string, PlanFeature[]> = {
  [PLANS.FREE]: [
    {
      name: 'ハイライト保存',
      description: 'Webページのハイライト部分をNotionに保存',
      included: true
    },
    {
      name: 'タグ機能',
      description: 'ハイライトにタグを追加・管理',
      included: true
    },
    {
      name: '基本メタデータ',
      description: '保存日、タイトル、URLなどの情報を保存',
      included: true
    },
    {
      name: 'メモ機能',
      description: 'ハイライトに加えてメモを記入＆保存',
      included: false
    },
    {
      name: '著者情報自動登録',
      description: '著者情報をNotionのDBに自動登録・リンク',
      included: false
    },
    {
      name: '複数端末同期',
      description: '複数デバイスでのシームレスな同期',
      included: false
    }
  ],
  [PLANS.MONTHLY]: [
    {
      name: 'ハイライト保存',
      description: 'Webページのハイライト部分をNotionに保存',
      included: true
    },
    {
      name: 'タグ機能',
      description: 'ハイライトにタグを追加・管理',
      included: true
    },
    {
      name: '基本メタデータ',
      description: '保存日、タイトル、URLなどの情報を保存',
      included: true
    },
    {
      name: 'メモ機能',
      description: 'ハイライトに加えてメモを記入＆保存',
      included: true
    },
    {
      name: '著者情報自動登録',
      description: '著者情報をNotionのDBに自動登録・リンク',
      included: true
    },
    {
      name: '複数端末同期',
      description: '複数デバイスでのシームレスな同期',
      included: true
    }
  ],
  [PLANS.ANNUAL]: [
    {
      name: 'ハイライト保存',
      description: 'Webページのハイライト部分をNotionに保存',
      included: true
    },
    {
      name: 'タグ機能',
      description: 'ハイライトにタグを追加・管理',
      included: true
    },
    {
      name: '基本メタデータ',
      description: '保存日、タイトル、URLなどの情報を保存',
      included: true
    },
    {
      name: 'メモ機能',
      description: 'ハイライトに加えてメモを記入＆保存',
      included: true
    },
    {
      name: '著者情報自動登録',
      description: '著者情報をNotionのDBに自動登録・リンク',
      included: true
    },
    {
      name: '複数端末同期',
      description: '複数デバイスでのシームレスな同期',
      included: true
    }
  ]
};

export function getPlanDetails(planId: string) {
  switch (planId) {
    case PLANS.MONTHLY:
      return {
        name: '月額プラン',
        description: '月ごとの支払い',
        price: 980,
        priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
        features: planFeatures[PLANS.MONTHLY]
      };
    case PLANS.ANNUAL:
      return {
        name: '年間プラン',
        description: '年ごとの支払い（2ヶ月分お得）',
        price: 9800,
        priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
        features: planFeatures[PLANS.ANNUAL]
      };
    case PLANS.FREE:
    default:
      return {
        name: '無料プラン',
        description: '基本機能',
        price: 0,
        priceId: '',
        features: planFeatures[PLANS.FREE]
      };
  }
} 