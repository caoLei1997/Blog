import { NextResponse } from 'next/server';
import { getArticleById } from '@/lib/articles';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // 在 Next.js 16 中，params 是一个 Promise，需要 await
    const { id } = await params;
    const post = await getArticleById(id);

    if (!post) {
        return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json(post);
}
