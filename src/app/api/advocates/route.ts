import db from '../../../db';
import { advocates } from '../../../db/schema';
import { sql } from 'drizzle-orm';

import { Advocate } from '../../../db/types';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  const data: Advocate[] = await db
    .select()
    .from(advocates)
    .limit(limit)
    .offset(offset);

  const totalResult = await db.execute<{ count: string }>(
    sql`SELECT COUNT(*) as count FROM ${advocates}`,
  );
  const total = parseInt(totalResult[0].count, 10);

  return Response.json({ data, total });
}
