const { exec } = require('child_process');

// プロジェクト全体からStripeの初期化や直接参照している箇所を検索
exec('grep -r "new Stripe" --include="*.{js,jsx,ts,tsx}" .', (err, stdout) => {
  console.log('Stripeインスタンス化箇所:', stdout || 'なし');
});

exec('grep -r "STRIPE_SECRET_KEY" --include="*.{js,jsx,ts,tsx}" .', (err, stdout) => {
  console.log('シークレットキー参照箇所:', stdout || 'なし');
});

exec('grep -r "stripe.checkout" --include="*.{js,jsx,ts,tsx}" .', (err, stdout) => {
  console.log('checkout関数の呼び出し箇所:', stdout || 'なし');
}); 