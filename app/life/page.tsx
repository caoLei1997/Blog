import { PageHeader } from "@/component";

export default function LifePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="人生路" subtitle="记录生活点滴，感受时光流转" />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 text-gray-500">
          内容建设中…
        </div>
      </main>
    </div>
  );
}
