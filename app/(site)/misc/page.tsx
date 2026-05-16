import { PageHeader } from "@/component";

export default function MiscPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="杂烩" subtitle="不限主题，皆是兴趣" />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 text-gray-500">
          内容建设中…
        </div>
      </main>
    </div>
  );
}
