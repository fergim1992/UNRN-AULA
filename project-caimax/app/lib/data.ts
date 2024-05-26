import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { UsersTable, User, AccessActivityWithUser } from './definitions';

export async function countUsers(query: string) {
  noStore();
  try {
    const data = await sql`SELECT COUNT(*) FROM users 
      WHERE name ILIKE ${`%${query}%`} OR 
      last_name ILIKE ${`%${query}%`} OR 
      dni::text ILIKE ${`%${query}%`} OR 
      role::text ILIKE ${`%${query}%`}`;
    return Number(data.rows[0].count);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to count users.');
  }
}
export async function getUserById(id: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function getAccessActivity() {
  noStore();
  try {
    const data = await sql<AccessActivityWithUser>`
      SELECT access_activity.id, access_activity.event, access_activity.access_type, access_activity.datetime,
      access_activity.user_id, users.name, users.last_name, users.role
      FROM access_activity
      JOIN users ON access_activity.user_id = users.id
      ORDER BY access_activity.datetime DESC`;
    const access_activity = data.rows;
    return access_activity;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all access activity.');
  }
}
export async function getAccessActivityByUserId(id: string) {
  noStore();
  try {
    const data = await sql<AccessActivityWithUser>`
      SELECT access_activity.id, access_activity.event, access_activity.access_type, 
      access_activity.datetime, access_activity.exit_datetime, access_activity.user_id, 
      access_activity.lector_id, lectors.location
      FROM access_activity
      JOIN lectors ON access_activity.lector_id = lectors.id
      WHERE access_activity.user_id = ${id}
      ORDER BY datetime DESC`;
    const access_activity = data.rows;
    return access_activity;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all access activity.');
  }
}
// export async function fetchLatestInvoices() {
//   noStore();
//   try {
//     const data = await sql<LatestInvoiceRaw>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.rows.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

// export async function fetchCardData() {
//   noStore();
//   try {
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//     const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

const ITEMS_PER_PAGE = 6;
export async function getFilteredUsers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
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

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function getUsersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      name ILIKE ${`%${query}%`} OR
      last_name ILIKE ${`%${query}%`} OR
      dni::text ILIKE ${`%${query}%`} OR
      role::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
}
