// app/api/articles/route.ts
import { NextResponse } from 'next/server';


const articles = [
  {
    id: 1,
    title: "Next.js App Router 深入解析",
    date: "2024-03-15 10:30:00",
    heat: 128,
    comments: 5,
    likes: 23,
    excerpt:
      "Next.js App Router 是 Next.js 13 引入的全新路由系统，基于 React Server Components 构建，提供了更强大的布局、嵌套路由和数据获取能力...",
    cover: "/img/r1.jpg",
  },
  {
    id: 2,
    title: "Tailwind CSS 实战技巧总结",
    date: "2024-03-10 14:20:00",
    heat: 96,
    comments: 3,
    likes: 18,
    excerpt:
      "Tailwind CSS 是一个实用优先的 CSS 框架，本文总结了在实际项目中使用 Tailwind CSS 的各种技巧，包括响应式设计、暗色模式、自定义主题等...",
    cover: "/img/r2.jpg",
  },
  {
    id: 3,
    title: "React 19 新特性一览",
    date: "2024-02-28 09:15:00",
    heat: 210,
    comments: 12,
    likes: 45,
    excerpt:
      "React 19 带来了许多令人兴奋的新特性，包括 Actions、use() hook、Server Components 的改进、以及全新的文档元数据支持...",
    cover: "/img/r1.jpg",
  },
  {
    id: 4,
    title: "TypeScript 高级类型编程指南",
    date: "2024-02-20 16:45:00",
    heat: 175,
    comments: 8,
    likes: 32,
    excerpt:
      "深入探索 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等，帮助你写出更安全、更优雅的代码...",
    cover: "/img/r2.jpg",
  },
];

export async function GET() {
  // 这里可以改成从数据库或文件系统读取
  return NextResponse.json(articles);
}