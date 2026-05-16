export const fakeMarkdown = `
# 你好，世界！

这是你的**第一篇文章**。

## 代码块

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## 表格（GFM）

| 库 | 用途 | 体积 |
|----|------|------|
| @m2d/jsx | Markdown 渲染 | 35kB |
| react-markdown | Markdown 渲染 | 45kB |

## 任务列表

- [x] 搭建博客框架
- [x] 集成 Markdown 渲染
- [ ] 部署上线

> 这是一条引用。

~~删除线~~ 和 [链接](https://example.com)。
`;
