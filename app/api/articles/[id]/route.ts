import { NextResponse } from 'next/server';
import { fakeMarkdown } from './mock.js';
// 仍用写死的数据模拟查询
const articles = [
    { id: '1', title: '你好，世界', content: fakeMarkdown },
    { id: '2', title: 'Next.js 16', content: fakeMarkdown },
];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // 在 Next.js 16 中，params 是一个 Promise，需要 await
    const { id } = await params;
    const post = articles.find((p) => p.id === id);

    if (!post) {
        return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json(post);
}