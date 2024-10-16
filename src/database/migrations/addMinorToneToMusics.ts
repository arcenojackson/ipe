import { db } from '../db'

export const AddMinorToneToMusics = {
  up: async () => {
    const { rows } =
      await db.sql`SELECT * FROM migrations WHERE name = 'addMinorToneToMusicsTable';`
    if (rows.length === 1) return
    await db.sql`
      ALTER TABLE musics
      ADD COLUMN minor_tone boolean NOT NULL DEFAULT false;
    `
    await db.sql`
      INSERT INTO migrations (name) VALUES ('addMinorToneToMusicsTable');
      `
  },

  down: async () => {
    const { rows } =
      await db.sql`SELECT * FROM migrations WHERE name = 'addMinorToneToMusicsTable';`
    if (!rows.length) return
    await db.sql`
      ALTER TABLE musics
      DROP COLUMN minor_tone;
    `
    await db.sql`
      DELETE FROM migrations WHERE name = 'addMinorToneToMusicsTable';
    `
  }
}
