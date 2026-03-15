export default function SubmitPage() {
  return (
    <div className="space-y-6 py-6">
      <section className="border-b border-[var(--line)] pb-6">
        <h1 className="text-2xl font-bold tracking-[-0.03em]">
          새로운 AI 툴을 알려주세요
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          아직 등록되지 않은 AI 툴이 있다면 알려주세요. 검토 후 추가됩니다.
        </p>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-white p-6">
        <form className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium">툴 이름</span>
              <input className="input" type="text" placeholder="예: Runway" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">공식 사이트</span>
              <input className="input" type="url" placeholder="https://example.com" />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-medium">대표 작업 태그</span>
            <select className="input" defaultValue="">
              <option value="" disabled>
                태그를 선택하세요
              </option>
              <option>아이디어 발상</option>
              <option>키워드 조사</option>
              <option>카피 작성</option>
              <option>글쓰기</option>
              <option>이미지 생성</option>
              <option>썸네일 제작</option>
              <option>영상 대본</option>
              <option>자막/번역</option>
              <option>음성 생성</option>
              <option>자료 요약</option>
              <option>고객 응대</option>
              <option>업무 자동화</option>
              <option>PPT 제작</option>
              <option>코드 작성</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">간단한 설명</span>
            <textarea
              className="input min-h-32 resize-y"
              placeholder="이 툴이 어떤 작업에 좋고, 누구에게 잘 맞는지 적어주세요"
            />
          </label>

          <button type="submit" className="button-primary w-fit">
            제보하기
          </button>
        </form>
      </section>
    </div>
  );
}
