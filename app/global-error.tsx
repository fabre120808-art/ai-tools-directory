"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, background: "#ffffff", color: "#1f1f1f", fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              border: "1px solid #e5e5e5",
              borderRadius: "20px",
              padding: "32px",
              textAlign: "center"
            }}
          >
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280" }}>
              오류 발생
            </p>
            <h1 style={{ margin: "16px 0 0", fontSize: "28px", lineHeight: 1.2 }}>
              페이지를 불러오는 중 문제가 발생했습니다
            </h1>
            <p style={{ margin: "16px 0 0", color: "#6b7280", fontSize: "14px", lineHeight: 1.6 }}>
              {error.digest ? `참고 코드: ${error.digest}` : "잠시 후 다시 시도해 주세요."}
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                marginTop: "24px",
                border: 0,
                borderRadius: "10px",
                background: "#1f1f1f",
                color: "#ffffff",
                padding: "10px 18px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              다시 시도하기
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
