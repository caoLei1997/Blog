// components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
            返回
        </button>
    );
}