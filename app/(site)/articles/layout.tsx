import { PageHeader } from "@/common";

export default function ArticlesLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {/* Hero Banner */}
            <PageHeader title="文章" subtitle="记录技术成长，分享学习心得" />
            {children}
        </div>
    )
}
