export default function SubmitPage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">Submit</span>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.08em]">
          Recommend a tool for the directory
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          This MVP uses a styled local form with no backend yet. You can wire this
          page to a database, server action, email workflow, or Airtable later.
        </p>
      </section>

      <section className="card rounded-[36px] p-6 md:p-8">
        <form className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Tool name</span>
              <input className="input" type="text" placeholder="e.g. Runway" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Website</span>
              <input className="input" type="url" placeholder="https://example.com" />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Category</span>
              <select className="input" defaultValue="">
                <option value="" disabled>
                  Select a category
                </option>
                <option>Assistant</option>
                <option>Image</option>
                <option>Video</option>
                <option>Search</option>
                <option>Developer Tools</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Pricing</span>
              <select className="input" defaultValue="">
                <option value="" disabled>
                  Select pricing
                </option>
                <option>Free</option>
                <option>Freemium</option>
                <option>Paid</option>
                <option>Enterprise</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold">Short description</span>
            <textarea
              className="input min-h-36 resize-y"
              placeholder="What does this tool do, and who is it for?"
            />
          </label>

          <button type="submit" className="button-primary w-fit border-0">
            Submit recommendation
          </button>
        </form>
      </section>
    </div>
  );
}
