export default function SubmitPage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">툴 제보</span>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.08em]">
          디렉토리에 추가하고 싶은 툴을 알려주세요
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          아직 등록되지 않은 AI 툴이나 꼭 소개하고 싶은 서비스를 제보할 수 있습니다.
        </p>
      </section>

      <section className="card rounded-[36px] p-6 md:p-8">
        <form className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">툴 이름</span>
              <input className="input" type="text" placeholder="예: Runway" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">공식 사이트</span>
              <input className="input" type="url" placeholder="https://example.com" />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">대표 작업 태그</span>
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
              <span className="text-sm font-semibold">요금제</span>
              <select className="input" defaultValue="">
                <option value="" disabled>
                  요금제를 선택하세요
                </option>
                <option>Free</option>
                <option>Freemium</option>
                <option>Paid</option>
                <option>Enterprise</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold">간단한 설명</span>
            <textarea
              className="input min-h-36 resize-y"
              placeholder="이 툴이 어떤 작업에 좋고, 누구에게 잘 맞는지 적어주세요"
            />
          </label>

          <button type="submit" className="button-primary w-fit border-0">
            제보 보내기
          </button>
        </form>
      </section>
    </div>
  );
}
