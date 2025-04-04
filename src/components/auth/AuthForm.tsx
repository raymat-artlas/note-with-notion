'use client';

import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  AuthError 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // エラーメッセージをユーザーフレンドリーに変換
  const getErrorMessage = (error: AuthError) => {
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'メールアドレスの形式が正しくありません';
      case 'auth/user-disabled':
        return 'このアカウントは無効化されています';
      case 'auth/user-not-found':
        return 'メールアドレスまたはパスワードが間違っています';
      case 'auth/wrong-password':
        return 'メールアドレスまたはパスワードが間違っています';
      case 'auth/email-already-in-use':
        return 'このメールアドレスはすでに使用されています';
      case 'auth/weak-password':
        return 'パスワードは6文字以上にしてください';
      case 'auth/network-request-failed':
        return 'ネットワークエラーが発生しました。インターネット接続を確認してください';
      case 'auth/too-many-requests':
        return 'ログイン試行回数が多すぎます。しばらく時間をおいてから再試行してください';
      default:
        return `エラーが発生しました: ${error.message}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // ログイン成功時にローカルストレージにUIDを保存（拡張機能用）
      const user = auth.currentUser;
      if (user) {
        localStorage.setItem('uid', user.uid);
      }
      
      // マイページへリダイレクト
      router.push('/dashboard');
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // ログイン成功時にローカルストレージにUIDを保存（拡張機能用）
      if (result.user) {
        localStorage.setItem('uid', result.user.uid);
      }
      
      // マイページへリダイレクト
      router.push('/dashboard');
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // パスワードの表示/非表示を切り替える
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        {mode === 'login' ? 'ログイン' : 'アカウント登録'}
      </h2>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="your-email@example.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            パスワード
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={mode === 'signup' ? '6文字以上のパスワード' : 'パスワード'}
              required
              minLength={6}
            />
            <button 
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {mode === 'login' && (
            <div className="text-right mt-1">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                パスワードをお忘れですか？
              </a>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '処理中...' : mode === 'login' ? 'ログイン' : 'アカウント作成'}
        </button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">または</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70 transition-colors"
        >
          <FcGoogle size={20} />
          Googleでログイン
        </button>
      </div>
    </div>
  );
} 