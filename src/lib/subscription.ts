import { PLANS } from './plans';

// ユーザーのサブスクリプションステータスに基づいて
// 特定の機能にアクセスできるか判断する関数
export const canAccessPremiumFeature = (
  userSubscription: { status?: string; plan?: string } | null | undefined
): boolean => {
  // サブスクリプションがない場合は false
  if (!userSubscription) return false;
  
  // アクティブなプレミアムプランなら true
  return (
    userSubscription.status === 'active' && 
    (userSubscription.plan === PLANS.MONTHLY || userSubscription.plan === PLANS.YEARLY)
  );
};

// ユーザーの現在のプラン情報を取得（UIでの表示用）
export const getUserPlanInfo = (
  userSubscription: { status?: string; plan?: string } | null | undefined
) => {
  if (!userSubscription || userSubscription.status !== 'active') {
    return PLANS.FREE;
  }
  
  return userSubscription.plan || PLANS.FREE;
}; 