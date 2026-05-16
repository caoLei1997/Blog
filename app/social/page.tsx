import { PageHeader } from "@/component";

export default function SocialPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="社交" subtitle="与世界保持温柔的连接" />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 text-gray-500">
          内容建设中…
        </div>
      </main>
    </div>
  );
}
