import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const url = process.env.TURSO_DATABASE_URL?.trim();
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

if (!url) {
  throw new Error(
    '[db] TURSO_DATABASE_URL 未设置。请在 .env.local 中配置，例如：\n' +
    '  本地开发：TURSO_DATABASE_URL=file:./local.db\n' +
    '  Turso 远程：TURSO_DATABASE_URL=libsql://<db>-<user>.turso.io\n' +
    '         TURSO_AUTH_TOKEN=<token>'
  );
}

// 提前校验，避免 libsql 抛出难懂的 URL_INVALID
if (!/^(libsql|file|wss?|https?):/.test(url)) {
  throw new Error(`[db] TURSO_DATABASE_URL 格式不合法: "${url}"，必须以 libsql:// / https:// / wss:// / file: 开头`);
}
if (/^(https?|wss?|libsql):/.test(url) && !url.includes('://')) {
  throw new Error(`[db] TURSO_DATABASE_URL 缺少 "//": "${url}"，请写成 libsql://... 或 https://...`);
}

const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });