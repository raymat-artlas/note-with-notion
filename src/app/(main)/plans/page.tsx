import Link from 'next/link';
import { PLANS, getPlanDetails } from '@/lib/plans';

export default function PlansPage() {
  const freePlan = getPlanDetails(PLANS.FREE);
  const monthlyPlan = getPlanDetails(PLANS.MONTHLY);
  const annualPlan = getPlanDetails(PLANS.ANNUAL);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
      <h1 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '16px' }}>
        シンプルな料金プラン
      </h1>
      
      {/* 年額プラン */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '40px',
        gap: '32px'
      }}>
        <div style={{ 
          width: '300px', 
          border: '1px solid #e5e7eb', 
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>年額プラン</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold' }}>¥4,800 <span style={{ fontSize: '16px' }}>/年</span></p>
            <p>年間で支払うとお得です</p>
          </div>
          <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb' }}>
            <a
              href="/api/stripe/annual-session"
              style={{ 
                display: 'block',
                width: '100%',
                backgroundColor: '#111827',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: '500',
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              年額で購入する
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 