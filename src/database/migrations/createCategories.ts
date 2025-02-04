import { db } from '../db'

export const CreateCategories = {
  up: async () => {
    const masterPassword = process.env.MASTER_HASHED_PASSWORD
    if (!masterPassword) throw new Error('Environment MASTER_HASHED_PASSWORD must be defined')
    const { rows } = await db.sql`SELECT * FROM migrations WHERE name = 'createCategories';`
    if (rows.length === 1) return
    await db.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id uuid DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        PRIMARY KEY (id)
      );
    `
    await db.sql`
      INSERT INTO migrations (name) VALUES ('createCategories');
      `
  },

  down: async () => {
    const { rows } = await db.sql`SELECT * FROM migrations WHERE name = 'createCategories';`
    if (!rows.length) return
    await db.sql`
      DROP TABLE categories;
      `
    await db.sql`
      DELETE FROM migrations WHERE name = 'createCategories';
      `
  }
}
