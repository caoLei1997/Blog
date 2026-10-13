'use client';

import { useParams } from 'next/navigation';
import ArticleForm from '../ArticleForm';

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;
  return <ArticleForm articleId={id} />;
}
