// components/PageTransition.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}      // 从右侧 300px 外进入
                animate={{ opacity: 1 }}         // 滑到正常位置
                exit={{ opacity: 0 }}         // 向左滑出
                transition={{
                    type: 'tween',
                    ease: 'easeInOut',
                    duration: 0.3,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}