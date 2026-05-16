import Link from 'next/link'
export default function NotFond() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">页面不见了</h2>
            <p className="mt-2 text-gray-500">你访问的页面可能已被移除或地址有误。</p>
            <Link
                href="/"
                className="mt-8 inline-block rounded-lg px-6 py-2"
            >
               返回首页
            </Link>
        </div>
    )
}
