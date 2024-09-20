import { db } from '../db'

export const AddIsAdminToPeople = {
  up: async () => {
    const masterPassword = process.env.MASTER_PASSWORD
    if (!masterPassword) throw new Error('Environment MASTER_PASSWORD must be defined')
    const { rows } = await db.sql`SELECT * FROM migrations WHERE name = 'addIsAdminToPeopleTable';`
    if (rows.length === 1) return
    await db.sql`
    ALTER TABLE people
    ADD COLUMN is_admin boolean NOT NULL DEFAULT false;
    `
    await db.sql`
    INSERT INTO people (name, email, password, is_admin)
      VALUES ('Master', 'master@ipe.com', ${masterPassword}, true);
      `
    await db.sql`
      INSERT INTO migrations (name) VALUES ('addIsAdminToPeopleTable');
      `
  },

  down: async () => {
    const { rows } = await db.sql`SELECT * FROM migrations WHERE name = 'addIsAdminToPeopleTable';`
    if (!rows.length) return
    await db.sql`
      ALTER TABLE people
      DROP COLUMN is_admin;
      `
    await db.sql`
      DELETE FROM people WHERE email = 'master@ipe.com';
      `
    await db.sql`
      DELETE FROM migrations WHERE name = 'addIsAdminToPeopleTable';
      `
  }
}
