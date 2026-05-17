import { Md } from '@m2d/react-markdown/server';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

interface Props {
  content: string;
}

export default function MarkdownContent({ content }: Props) {
  return (
    <Md remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
      {content}
    </Md>
  );
}