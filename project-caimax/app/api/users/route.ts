import { UsersTable } from '@/app/lib/definitions';
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
    if (id) {
      const user = await sql<UsersTable>`SELECT * FROM users WHERE id=${id}`;
      return NextResponse.json(user.rows[0], { status: 200 });
    } else if (!query && currentPage) {
      const users = await sql<UsersTable>`
        SELECT *
        FROM (
          SELECT
            id,
            name,
            last_name,
            dni, 
            role,
            CASE 
              WHEN fingerprint IS NOT NULL THEN 'huella' ELSE null 
            END AS fingerprint,
            CASE
              WHEN rfid IS NOT NULL THEN 'rfid' ELSE null 
            END AS rfid,
            CASE
              WHEN tag_rfid IS NOT NULL THEN 'tag rfid' ELSE null 
            END AS tag_rfid
          FROM users
        ) AS subquery
        ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(users.rows, { status: 200 });
    } else if (query && currentPage) {
      const users = await sql<UsersTable>`
        SELECT *
        FROM (
          SELECT
            id,
            name,
            last_name,
            dni, 
            role,
            CASE 
              WHEN fingerprint IS NOT NULL THEN 'huella' ELSE null 
            END AS fingerprint,
            CASE
              WHEN rfid IS NOT NULL THEN 'rfid' ELSE null 
            END AS rfid,
            CASE
              WHEN tag_rfid IS NOT NULL THEN 'tag rfid' ELSE null 
            END AS tag_rfid
          FROM users
        ) AS subquery
        WHERE
          name ILIKE ${`%${query}%`} OR
          last_name ILIKE ${`%${query}%`} OR
          dni::text ILIKE ${`%${query}%`} OR
          role::text ILIKE ${`%${query}%`} OR
          fingerprint::text ILIKE ${`%${query}%`}  OR
          rfid::text ILIKE ${`%${query}%`} OR
          tag_rfid::text ILIKE ${`${query}%`}
        ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(users.rows, { status: 200 });
    } else if (query && !currentPage) {
      const users = await sql<UsersTable>`
        SELECT *
        FROM (
          SELECT
            id,
            name,
            last_name,
            dni, 
            role,
            CASE 
              WHEN fingerprint IS NOT NULL THEN 'huella' ELSE null 
            END AS fingerprint,
            CASE
              WHEN rfid IS NOT NULL THEN 'rfid' ELSE null 
            END AS rfid,
            CASE
              WHEN tag_rfid IS NOT NULL THEN 'tag rfid' ELSE null 
            END AS tag_rfid
          FROM users
        ) AS subquery
        WHERE
          name ILIKE ${`%${query}%`} OR
          last_name ILIKE ${`%${query}%`} OR
          dni::text ILIKE ${`%${query}%`} OR
          role::text ILIKE ${`%${query}%`} OR
          fingerprint::text ILIKE ${`%${query}%`}  OR
          rfid::text ILIKE ${`%${query}%`} OR
          tag_rfid::text ILIKE ${`${query}%`}
        ORDER BY id DESC
      `;
      return NextResponse.json(users.rows, { status: 200 });
    } else {
      const users = await sql<UsersTable>`
    SELECT
      id,
      name,
      last_name,
      dni, 
      role,
      CASE 
        WHEN fingerprint IS NOT NULL THEN 'huella' ELSE null 
      END AS fingerprint,
      CASE
        WHEN rfid IS NOT NULL THEN 'rfid' ELSE null 
      END AS rfid,
      CASE
        WHEN tag_rfid IS NOT NULL THEN 'tag rfid' ELSE null 
      END AS tag_rfid
    FROM users
    ORDER BY id DESC
    `;
      return NextResponse.json(users.rows, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
