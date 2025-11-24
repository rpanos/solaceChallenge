import db from '../../../db';
import { advocates } from '../../../db/schema';
import { eq, ilike, or, and, sql } from 'drizzle-orm';

import { Advocate } from '../../../db/types';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  const filter = url.searchParams.get('filter') || '';
  const minYears = parseInt(url.searchParams.get('minYears') || '0', 10);

  const conditions = and(
    or(
      ilike(advocates.firstName, `%${filter}%`),
      ilike(advocates.lastName, `%${filter}%`),
      ilike(advocates.city, `%${filter}%`),
      ilike(advocates.degree, `%${filter}%`),
      sql`${advocates.specialties} @> ${JSON.stringify([filter])}`,
    ),
    sql`${advocates.yearsOfExperience} >= ${minYears}`,
  );

  const data: Advocate[] = await db
    .select()
    .from(advocates)
    .where(conditions)
    .limit(limit)
    .offset(offset);

  const total = await db
    .execute<{ count: string }>(
      sql`
      SELECT COUNT(*) as count
      FROM ${advocates}
      WHERE ${conditions}
    `,
    )
    .then((res) => {
      return parseInt(res[0].count, 10);
    });

  return Response.json({ data, total });
}
