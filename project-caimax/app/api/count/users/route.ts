import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request: Request) {
  noStore();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  try {
    if (!query) {
      const data = await sql`SELECT COUNT(*) FROM users`;
      return NextResponse.json(Number(data.rows[0].count), { status: 200 });
    } else {
      const data = await sql`SELECT COUNT(*) FROM users 
            WHERE name ILIKE ${`%${query}%`} OR 
            last_name ILIKE ${`%${query}%`} OR 
            dni::text ILIKE ${`%${query}%`} OR 
            role::text ILIKE ${`%${query}%`}`;
      return NextResponse.json(Number(data.rows[0].count), { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
