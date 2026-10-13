import { PageHeader } from "@/common";
import { Code2, BookOpen, MessageCircle, Video, Rss } from "lucide-react";

const channels = [
  {
    name: "GitHub",
    description: "开源项目与代码片段",
    href: "https://github.com/caolei",
    icon: Code2,
    color: "bg-gray-800",
  },
  {
    name: "掘金专栏",
    description: "技术文章同步更新",
    href: "https://juejin.cn/user/",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    name: "知乎",
    description: "问答与想法",
    href: "https://www.zhihu.com/people/",
    icon: MessageCircle,
    color: "bg-sky-600",
  },
  {
    name: "Bilibili",
    description: "偶尔录制的视频",
    href: "https://space.bilibili.com/",
    icon: Video,
    color: "bg-pink-500",
  },
];

export default function SocialPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="社交" subtitle="与世界保持温柔的连接" />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const external = channel.href.startsWith("http");
              return (
                <a
                  key={channel.name}
                  href={channel.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`p-3 rounded-xl ${channel.color} text-white shrink-0`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                        {channel.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 break-all">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* RSS 提示 */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <span className="p-3 rounded-xl bg-orange-500 text-white shrink-0">
              <Rss className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">RSS 订阅</h3>
              <p className="text-sm text-gray-500 mt-1">
                在任意 RSS 阅读器中添加{" "}
                <code className="px-1.5 py-0.5 bg-gray-100 rounded text-orange-600 text-xs">
                  /articles
                </code>{" "}
                页面地址，第一时间获取更新。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
