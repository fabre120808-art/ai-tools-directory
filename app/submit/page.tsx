export default function SubmitPage() {
  return (
    <div className="space-y-6 pt-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">도구 제보하기</h1>
        <p className="mt-2 max-w-lg text-[var(--muted)]">
          좋은 AI 도구를 알고 계신가요? 아래 양식을 통해 제보해주시면 검토 후 디렉토리에 추가합니다.
        </p>
      </div>

      {/* Form Card */}
      <div className="card max-w-2xl p-6">
        <form className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">도구 이름</span>
              <input className="input" type="text" placeholder="예: Runway" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">웹사이트</span>
              <input className="input" type="url" placeholder="https://example.com" />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">카테고리</span>
              <select className="input" defaultValue="">
                <option value="" disabled>
                  카테고리 선택
                </option>
                <option>자료 요약</option>
                <option>이미지 생성</option>
                <option>영상 제작</option>
                <option>검색/리서치</option>
                <option>개발 도구</option>
                <option>자동화</option>
                <option>기타</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">가격 정책</span>
              <select className="input" defaultValue="">
                <option value="" disabled>
                  가격 정책 선택
                </option>
                <option>Free</option>
                <option>Freemium</option>
                <option>Paid</option>
                <option>Enterprise</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">간단한 설명</span>
            <textarea
              className="input min-h-32 resize-y"
              placeholder="이 도구가 무엇을 하고, 누구에게 유용한지 간단히 설명해주세요."
            />
          </label>

          <button type="submit" className="button-primary">
            제보하기
          </button>
        </form>
      </div>
    </div>
  );
}
