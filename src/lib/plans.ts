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

export function getPlanDetails(planType: string) {
  switch (planType) {
    case PLANS.FREE:
      return {
        name: '無料プラン',
        description: '試用目的・シンプル機能',
        price: 0,
        priceId: process.env.STRIPE_PRICE_ID_FREE || '',
        features: planFeatures[PLANS.FREE]
      };
    case PLANS.MONTHLY:
      return {
        name: 'プレミアムプラン（月額）',
        description: '知識管理をさらに快適に',
        price: 500,
        priceId: process.env.STRIPE_PRICE_ID_MONTHLY || '',
        features: planFeatures[PLANS.MONTHLY]
      };
    case PLANS.ANNUAL:
      return {
        name: 'プレミアムプラン（年額）',
        description: '年間契約でお得に',
        price: 4800,
        priceId: process.env.STRIPE_PRICE_ID_ANNUAL || '',
        features: planFeatures[PLANS.ANNUAL]
      };
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