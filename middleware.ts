// middleware.ts（放在项目根目录，与 app 同级）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 仅保护后台相关路径
  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/api/admin')
  ) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
      // 解析 Basic Auth 头部
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (
        user === process.env.ADMIN_USER &&
        pwd === process.env.ADMIN_PASS
      ) {
        return NextResponse.next();
      }
    }

    // 认证失败，返回 401 并弹出登录框
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// 配置中间件匹配路径
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};