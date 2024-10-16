import { db } from '../db'

const tones: any = {
  A: '0',
  'A#': '1',
  B: '2',
  C: '3',
  'C#': '4',
  D: '5',
  'D#': '6',
  E: '7',
  F: '8',
  'F#': '9',
  G: '10',
  'G#': '11'
}

export const ChangeValueOfMusicsTone = {
  up: async () => {
    const { rows } =
      await db.sql`SELECT * FROM migrations WHERE name = 'changeValueOfMusicsToneTable';`
    if (rows.length === 1) return
    const { rows: musics } = await db.sql`SELECT id, tone FROM musics;`
    for (const music of musics) {
      await db.sql`UPDATE musics SET tone = ${tones[music.tone]} WHERE id = ${music.id};`
    }
    await db.sql`
      INSERT INTO migrations (name) VALUES ('changeValueOfMusicsToneTable');
      `
  },

  down: async () => {
    const { rows } =
      await db.sql`SELECT * FROM migrations WHERE name = 'changeValueOfMusicsToneTable';`
    if (!rows.length) return
    await db.sql`
      DELETE FROM migrations WHERE name = 'changeValueOfMusicsToneTable';
    `
  }
}
