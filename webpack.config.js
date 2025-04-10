const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // 既存の設定...
  
  plugins: [
    // 既存のプラグイン...
    new CopyWebpackPlugin({
      patterns: [
        // Firebase SDKファイル
        { from: 'node_modules/firebase/firebase-app-compat.js', to: 'firebase-app.js' },
        { from: 'node_modules/firebase/firebase-auth-compat.js', to: 'firebase-auth.js' }
      ]
    })
  ]
}; 