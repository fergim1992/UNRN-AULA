import { AccessActivityWithUser } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request: Request) {
  noStore();
  const ITEMS_PER_PAGE = 6;
  const { searchParams } = new URL(request.url);
  const currentPage = searchParams.get('page');
  const query = searchParams.get('query');
  const id = searchParams.get('id');
  const offset = (Number(currentPage) - 1) * ITEMS_PER_PAGE;
  try {
    if (id && !query && !currentPage) {
      const data = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        WHERE 
          access_activity.user_id = ${id}
        ORDER BY 
          access_activity.datetime DESC`;
      return NextResponse.json(data.rows, { status: 200 });
    } else if (id && query && !currentPage) {
      const data = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        WHERE 
          access_activity.user_id = ${id} AND
          (users.name ILIKE ${`%${query}%`} OR
          users.last_name ILIKE ${`%${query}%`} OR
          users.role::text ILIKE ${`%${query}%`} OR
          lectors.location::text ILIKE ${`%${query}%`}  OR
          access_activity.datetime::text ILIKE ${`%${query}%`} OR
          access_activity.event::text ILIKE ${`${query}%`} OR
          access_activity.access_type::text ILIKE ${`${query}%`})
        ORDER BY 
          access_activity.datetime DESC`;
      return NextResponse.json(data.rows, { status: 200 });
    } else if (id && query && currentPage) {
      const data = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        WHERE 
          access_activity.user_id = ${id} AND
          (users.name ILIKE ${`%${query}%`} OR
          users.last_name ILIKE ${`%${query}%`} OR
          users.role::text ILIKE ${`%${query}%`} OR
          lectors.location::text ILIKE ${`%${query}%`}  OR
          access_activity.datetime::text ILIKE ${`%${query}%`} OR
          access_activity.event::text ILIKE ${`${query}%`} OR
          access_activity.access_type::text ILIKE ${`${query}%`})
        ORDER BY 
          access_activity.datetime DESC
        LIMIT 
          ${ITEMS_PER_PAGE} 
        OFFSET 
          ${offset}
      `;
      return NextResponse.json(data.rows, { status: 200 });
    } else if (id && !query && currentPage) {
      const data = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        WHERE 
          access_activity.user_id = ${id}
        ORDER BY 
          access_activity.datetime DESC
        LIMIT 
          ${ITEMS_PER_PAGE} 
        OFFSET 
          ${offset}
      `;
      return NextResponse.json(data.rows, { status: 200 });
    } else if (!query && currentPage) {
      const users = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        ORDER BY 
          access_activity.datetime DESC
        LIMIT 
          ${ITEMS_PER_PAGE} 
        OFFSET 
          ${offset}
      `;
      return NextResponse.json(users.rows, { status: 200 });
    } else if (query && currentPage) {
      const users = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.last_name ILIKE ${`%${query}%`} OR
          users.role::text ILIKE ${`%${query}%`} OR
          lectors.location::text ILIKE ${`%${query}%`}  OR
          access_activity.datetime::text ILIKE ${`%${query}%`} OR
          access_activity.event::text ILIKE ${`${query}%`} OR
          access_activity.access_type::text ILIKE ${`${query}%`}
        ORDER BY 
          access_activity.datetime DESC
        LIMIT 
          ${ITEMS_PER_PAGE} 
        OFFSET 
          ${offset}
      `;
      return NextResponse.json(users.rows, { status: 200 });
    } else if (query && !currentPage) {
      const users = await sql<AccessActivityWithUser>`
        SELECT 
          access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
          access_activity.user_id, users.name, users.last_name, users.role, lectors.location
        FROM 
          access_activity
        JOIN users ON access_activity.user_id = users.id
        JOIN lectors ON access_activity.lector_id = lectors.id
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.last_name ILIKE ${`%${query}%`} OR
          users.role::text ILIKE ${`%${query}%`} OR
          lectors.location::text ILIKE ${`%${query}%`}  OR
          access_activity.datetime::text ILIKE ${`%${query}%`} OR
          access_activity.event::text ILIKE ${`${query}%`} OR
          access_activity.access_type::text ILIKE ${`${query}%`}
        ORDER BY 
          access_activity.datetime DESC
      `;
      return NextResponse.json(users.rows, { status: 200 });
    } else {
      const users = await sql<AccessActivityWithUser>`
      SELECT 
        access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
        access_activity.user_id, users.name, users.last_name, users.role, lectors.location
      FROM 
        access_activity
      JOIN users ON access_activity.user_id = users.id
      JOIN lectors ON access_activity.lector_id = lectors.id
      ORDER BY 
        access_activity.datetime DESC`;
      return NextResponse.json(users.rows, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
