import { Suspense } from "react";
import { ToolsContent } from "@/components/tools-content";

function ToolsPageSkeleton() {
  return (
    <div className="space-y-8 py-12">
      {/* Page Header Skeleton */}
      <div className="max-w-2xl">
        <div className="h-9 w-64 animate-pulse rounded-lg bg-[var(--line)]" />
        <div className="mt-3 h-5 w-96 animate-pulse rounded bg-[var(--line)]" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-11 max-w-lg animate-pulse rounded-xl bg-[var(--line)]" />

      {/* Tag Filter Skeleton */}
      <div>
        <div className="mb-3 h-4 w-16 animate-pulse rounded bg-[var(--line)]" />
        <div className="flex gap-2 border-b border-[var(--line)] pb-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-[var(--line)]" />
          ))}
        </div>
      </div>

      {/* Filter Status Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-[var(--line)]" />
        <div className="flex gap-2">
          <div className="h-8 w-16 animate-pulse rounded-md bg-[var(--line)]" />
          <div className="h-8 w-16 animate-pulse rounded-md bg-[var(--line)]" />
        </div>
      </div>

      {/* Tools Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card animate-pulse space-y-4 p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-[var(--line)]" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-24 rounded bg-[var(--line)]" />
                <div className="h-4 w-32 rounded bg-[var(--line)]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-[var(--line)]" />
              <div className="h-3 w-4/5 rounded bg-[var(--line)]" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-14 rounded-full bg-[var(--line)]" />
              <div className="h-6 w-14 rounded-full bg-[var(--line)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<ToolsPageSkeleton />}>
      <ToolsContent />
    </Suspense>
  );
}
