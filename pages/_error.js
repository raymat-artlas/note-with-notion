function Error({ statusCode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        {statusCode
          ? `サーバーエラーが発生しました: ${statusCode}`
          : 'クライアントエラーが発生しました'}
      </h1>
      <p className="mb-4">
        ページの読み込み中に問題が発生しました。
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        再読み込み
      </button>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 