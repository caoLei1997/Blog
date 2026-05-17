import { PageHeader } from "@/common";

export default function PhotographyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="摄影" subtitle="用镜头定格瞬间美好" />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 text-gray-500">
          内容建设中…
        </div>
      </main>
    </div>
  );
}
