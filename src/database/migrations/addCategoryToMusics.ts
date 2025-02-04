import { db } from '../db'

export const AddCategoryToMusics = {
  up: async () => {
    const masterPassword = process.env.MASTER_HASHED_PASSWORD
    if (!masterPassword) throw new Error('Environment MASTER_HASHED_PASSWORD must be defined')
    const { rows } = await db.sql`SELECT * FROM migrations WHERE name = 'addCategoryToMusics';`
    if (rows.length === 1) return
    await db.sql`
      ALTER TABLE musics
      ADD COLUMN category TEXT NOT NULL DEFAULT '';
    `
    await db.sql`
      INSERT INTO migrations (name) VALUES ('addCategoryToMusics');
      `
  },

  down: async () => {
    const { rows } = await db.sql`SELECT * FROM migrations WHERE name = 'addCategoryToMusics';`
    if (!rows.length) return
    await db.sql`
      ALTER TABLE musics
      DROP COLUMN category;
      `
    await db.sql`
      DELETE FROM migrations WHERE name = 'addCategoryToMusics';
      `
  }
}
