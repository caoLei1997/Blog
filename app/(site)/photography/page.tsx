import Image from "next/image";
import { PageHeader } from "@/common";
import { getPhotographyList } from "@/lib/photography";

export default async function PhotographyPage() {
  const items = await getPhotographyList();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="摄影" subtitle="用镜头定格瞬间美好" />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          {items.length === 0 ? (
            <div className="text-gray-400 text-center py-20">暂无内容</div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative group break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title ?? ""}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <div className="p-3 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {item.title && (
                        <h3 className="text-white text-sm font-semibold truncate">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-white/80 text-xs mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
